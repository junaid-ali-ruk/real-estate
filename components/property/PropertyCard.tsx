"use client";

import { ArrowUpRight, Bath, Bed, Heart, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { urlFor, urlForWithPlaceholder } from "@/lib/sanity/image";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  onSave?: (propertyId: string) => void;
  isSaved?: boolean;
  showRemoveButton?: boolean;
}

export function PropertyCard({
  property,
  onSave,
  isSaved,
  showRemoveButton: _showRemoveButton,
}: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) {
      onSave(property._id);
    }
  };

  const statusLabel =
    property.status && property.status !== "active"
      ? property.status.charAt(0).toUpperCase() + property.status.slice(1)
      : null;

  const imageData = property.image
    ? urlForWithPlaceholder(property.image)
    : null;

  return (
    <div className="group h-full">
      <Link href={`/properties/${property.slug}`} className="block h-full">
        <article className="bg-background overflow-hidden h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden border border-border group-hover:border-primary transition-colors duration-300">
            {imageData && property.image ? (
              <Image
                src={urlFor(property.image).width(800).height(1000).url()}
                alt={property.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                placeholder={imageData.placeholder}
                blurDataURL={imageData.blurDataURL}
              />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Image Pending
                </span>
              </div>
            )}

            {/* Minimal Overlay */}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" />

            {/* Detail Arrow - Reveals on Hover */}
            <div className="absolute bottom-4 right-4 h-10 w-10 bg-background border border-border flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 shadow-sm">
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </div>

            {/* Save Button */}
            {onSave && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-10 w-10 bg-background/80 backdrop-blur-sm border-l border-b border-border hover:bg-primary hover:text-primary-foreground transition-colors duration-200 z-20"
                onClick={handleSaveClick}
                aria-label={
                  isSaved ? "Remove from saved properties" : "Save property"
                }
              >
                <Heart
                  className={`h-4 w-4 transition-transform active:scale-90 ${
                    isSaved ? "fill-current text-destructive" : "text-current"
                  }`}
                  aria-hidden="true"
                />
              </Button>
            )}

            {/* Status Badge */}
            {statusLabel && (
              <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm px-2 py-1 z-20 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  {statusLabel}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="font-heading text-xl tracking-tight uppercase group-hover:text-primary transition-colors">
                  {formatPrice(property.price)}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                  {property.propertyType}
                </span>
              </div>

              <p
                className="text-sm font-medium text-muted-foreground line-clamp-1 mb-4 border-b border-border pb-3 group-hover:border-primary/50 transition-colors"
                title={property.title}
              >
                {property.title?.includes("Error:") ||
                property.title?.includes("Uncaught")
                  ? "Property Details Unavailable"
                  : property.title}
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <div className="flex gap-3">
                <span className="flex items-center gap-1.5">
                  <Bed className="h-3 w-3" /> {property.bedrooms}
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath className="h-3 w-3" /> {property.bathrooms}
                </span>
              </div>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {property.address?.city}
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
