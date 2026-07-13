/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: accessibilityservices
 * Interface for AccessibilityServices
 */
export interface AccessibilityServices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  operatingHours?: string;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
}


/**
 * Collection ID: emergencyrequests
 * Interface for EmergencyRequests
 */
export interface EmergencyRequests {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  requestType?: string;
  /** @wixFieldType text */
  locationData?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mediaAttachment?: string;
  /** @wixFieldType text */
  resolutionStatus?: string;
  /** @wixFieldType datetime */
  submissionTime?: Date | string;
}


/**
 * Collection ID: events
 * Interface for EventsMatches
 */
export interface EventsMatches {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventTitle?: string;
  /** @wixFieldType datetime */
  eventDateTime?: Date | string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  eventType?: string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: feedbackreports
 * Interface for FeedbackIncidentReports
 */
export interface FeedbackIncidentReports {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  latitude?: number;
  /** @wixFieldType number */
  longitude?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mediaAttachment?: string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType datetime */
  submissionTimestamp?: Date | string;
}


/**
 * Collection ID: foodvendors
 * Interface for FoodVendors
 */
export interface FoodVendors {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  vendorName?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  cuisineType?: string;
  /** @wixFieldType text */
  dietaryOptions?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  vendorImage?: string;
  /** @wixFieldType text */
  openingHours?: string;
  /** @wixFieldType number */
  averageRating?: number;
  /** @wixFieldType url */
  menuUrl?: string;
}


/**
 * Collection ID: merchandiseoffers
 * @catalog This collection is an eCommerce catalog
 * Interface for MerchandiseOffers
 */
export interface MerchandiseOffers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
}


/**
 * Collection ID: stadiumzones
 * Interface for StadiumZones
 */
export interface StadiumZones {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  zoneName?: string;
  /** @wixFieldType number */
  maxCapacity?: number;
  /** @wixFieldType number */
  currentDensityLevel?: number;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  zoneType?: string;
  /** @wixFieldType text */
  locationCoordinates?: string;
}


/**
 * Collection ID: trainingmaterials
 * Interface for TrainingMaterials
 */
export interface TrainingMaterials {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  resourceTitle?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  language?: string;
  /** @wixFieldType url */
  fileUrl?: string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: transitoptions
 * Interface for TransitOptions
 */
export interface TransitOptions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  transitType?: string;
  /** @wixFieldType text */
  locationName?: string;
  /** @wixFieldType text */
  operationalStatus?: string;
  /** @wixFieldType number */
  waitTimeEstimateMinutes?: number;
  /** @wixFieldType text */
  capacityLevel?: string;
  /** @wixFieldType datetime */
  lastUpdated?: Date | string;
}


/**
 * Collection ID: volunteertasks
 * Interface for VolunteerTasks
 */
export interface VolunteerTasks {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  taskTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  priorityLevel?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  completionStatus?: string;
}
