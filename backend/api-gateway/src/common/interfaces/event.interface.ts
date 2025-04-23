export interface Event<T> {
  id: string;          // Unique event identifier
  timestamp: string;   // When the event was created
  type: string;        // Event type (e.g., 'USER_CREATED')
  source: string;      // Service that created the event
  data: T;             // Event payload
}