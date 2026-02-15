import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  propertyType: z.enum(["house", "apartment", "condo", "townhouse", "land"]),
  status: z.enum(["active", "pending", "sold"]).optional(),
  bedrooms: z.coerce.number().min(0),
  bathrooms: z.coerce.number().min(0),
  squareFeet: z.coerce.number().min(0),
  yearBuilt: z.coerce
    .number()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),
  street: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  amenities: z.array(z.string()).optional(),
});

export type ListingFormData = z.infer<typeof listingSchema>;
