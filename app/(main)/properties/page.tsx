import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DynamicMapView } from "@/components/map/DynamicMapView";
import { FilterSidebar } from "@/components/property/FilterSidebar";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sanityFetch } from "@/lib/sanity/live";
import {
  AMENITIES_QUERY,
  PROPERTIES_COUNT_QUERY,
  PROPERTIES_SEARCH_QUERY,
} from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Browse Properties",
  description:
    "Find your perfect home from our curated selection of properties. Filter by price, bedrooms, location, and more.",
};

const ITEMS_PER_PAGE = 12;

interface SearchParams {
  minPrice?: string;
  maxPrice?: string;
  beds?: string;
  baths?: string;
  type?: string;
  city?: string;
  page?: string;
  // Advanced filters
  minSqft?: string;
  maxSqft?: string;
  minYear?: string;
  maxYear?: string;
  minLotSize?: string;
  maxLotSize?: string;
  daysOnMarket?: string;
  openHouse?: string;
  priceReduced?: string;
  amenities?: string;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Number.parseInt(params.page || "1", 10);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  // Parse amenities from comma-separated string
  const amenitiesList = params.amenities?.split(",").filter(Boolean) || [];

  // Handle "5+" values for beds/baths - extract number and track if it's a "plus" value
  const bedsValue = params.beds || "0";
  const bathsValue = params.baths || "0";
  const bedsIsPlus = bedsValue.includes("+");
  const bathsIsPlus = bathsValue.includes("+");
  const bedsNum = Number.parseInt(bedsValue.replace("+", ""), 10) || 0;
  const bathsNum = Number.parseInt(bathsValue.replace("+", ""), 10) || 0;

  const queryParams = {
    minPrice: Number(params.minPrice) || 0,
    maxPrice: Number(params.maxPrice) || 100000000,
    beds: bedsNum,
    bedsIsPlus,
    baths: bathsNum,
    bathsIsPlus,
    type: params.type === "all" ? "" : params.type || "",
    city: params.city?.toLowerCase() || "",
    // Advanced filters
    minSqft: Number(params.minSqft) || 0,
    maxSqft: Number(params.maxSqft) || 0,
    minYear: Number(params.minYear) || 0,
    maxYear: Number(params.maxYear) || 0,
    minLotSize: Number(params.minLotSize) || 0,
    maxLotSize: Number(params.maxLotSize) || 0,
    daysOnMarket: Number(params.daysOnMarket) || 0,
    openHouse: params.openHouse === "true",
    priceReduced: params.priceReduced === "true",
    amenities: amenitiesList,
    amenitiesCount: amenitiesList.length,
    start,
    end,
  };

  const [{ data: properties }, { data: totalCount }, { data: amenities }] =
    await Promise.all([
      sanityFetch({
        query: PROPERTIES_SEARCH_QUERY,
        params: queryParams,
      }),
      sanityFetch({
        query: PROPERTIES_COUNT_QUERY,
        params: queryParams,
      }),
      sanityFetch({
        query: AMENITIES_QUERY,
      }),
    ]);

  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE);
  const hasFilters =
    params.minPrice ||
    params.maxPrice ||
    params.beds ||
    params.baths ||
    (params.type && params.type !== "all") ||
    params.city ||
    params.minSqft ||
    params.maxSqft ||
    params.minYear ||
    params.maxYear ||
    params.minLotSize ||
    params.maxLotSize ||
    params.daysOnMarket ||
    params.openHouse === "true" ||
    params.priceReduced === "true" ||
    params.amenities;

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Editorial Style */}
      <div className="border-b border-border bg-card/50">
        <div className="container py-16 md:py-24">
          <nav
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Archives
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-foreground italic font-light">
              The Collection
            </span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-display text-4xl md:text-7xl mb-6">
              EXAMINE <br /> COLLECTION
            </h1>
            <p className="text-editorial text-muted-foreground">
              Explore our meticulously curated selection of architectural
              legacies and contemporary residences.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar - Sharp Editorial */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-32">
              <div className="mb-8 pb-4 border-b border-border">
                <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
                  Refinement
                </h2>
              </div>
              <Suspense
                fallback={
                  <Skeleton className="h-[500px] w-full rounded-none" />
                }
              >
                <FilterSidebar amenities={amenities || []} />
              </Suspense>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Tabs defaultValue="list" className="w-full">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-12 pb-6 border-b border-border">
                <div>
                  <p className="text-xl font-heading italic">
                    <span className="tabular-nums font-bold">
                      {totalCount || 0}
                    </span>{" "}
                    Discoveries
                  </p>
                </div>

                <TabsList className="bg-transparent border border-border p-0 rounded-none h-10">
                  <TabsTrigger
                    value="list"
                    className="flex items-center gap-2 rounded-none px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full text-[10px] font-bold uppercase tracking-widest"
                  >
                    Gallery
                  </TabsTrigger>
                  <TabsTrigger
                    value="map"
                    className="flex items-center gap-2 rounded-none px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full text-[10px] font-bold uppercase tracking-widest"
                  >
                    Cartography
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="list" className="mt-0">
                {properties && properties.length > 0 ? (
                  <>
                    <PropertyGrid properties={properties} />

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <nav
                        className="flex items-center justify-center gap-2 mt-10"
                        aria-label="Pagination"
                      >
                        {page > 1 ? (
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={`/properties?${new URLSearchParams({
                                ...params,
                                page: String(page - 1),
                              }).toString()}`}
                            >
                              <ChevronLeft
                                className="h-4 w-4 mr-1"
                                aria-hidden="true"
                              />
                              Previous
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            <ChevronLeft
                              className="h-4 w-4 mr-1"
                              aria-hidden="true"
                            />
                            Previous
                          </Button>
                        )}

                        <span className="flex items-center px-4 text-sm text-muted-foreground tabular-nums">
                          Page{" "}
                          <span className="font-medium text-foreground mx-1">
                            {page}
                          </span>{" "}
                          of{" "}
                          <span className="font-medium text-foreground ml-1">
                            {totalPages}
                          </span>
                        </span>

                        {page < totalPages ? (
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={`/properties?${new URLSearchParams({
                                ...params,
                                page: String(page + 1),
                              }).toString()}`}
                            >
                              Next
                              <ChevronRight
                                className="h-4 w-4 ml-1"
                                aria-hidden="true"
                              />
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            Next
                            <ChevronRight
                              className="h-4 w-4 ml-1"
                              aria-hidden="true"
                            />
                          </Button>
                        )}
                      </nav>
                    )}
                  </>
                ) : (
                  /* Empty State */
                  <div className="text-center py-16 bg-background rounded-2xl border border-border/50">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Home
                        className="h-8 w-8 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg font-semibold font-heading mb-2">
                      No Properties Found
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      {hasFilters
                        ? "Try adjusting your filters to see more results."
                        : "There are no properties available at the moment."}
                    </p>
                    {hasFilters && (
                      <Button variant="outline" asChild>
                        <Link href="/properties">Clear All Filters</Link>
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="map" className="mt-0">
                <div className="h-[600px] rounded-2xl overflow-hidden border border-border/50 shadow-warm">
                  <DynamicMapView properties={properties || []} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
