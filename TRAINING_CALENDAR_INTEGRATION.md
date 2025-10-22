# TrainingCalendar Component API Integration

## Overview

The TrainingCalendar component has been updated to integrate with the `/training-calander` API endpoint. It now fetches training data based on user ID, sport ID, and category ID, and displays training sessions on the calendar.

## Features Added

### 1. API Integration

- Fetches training calendar data from `/training-calander` endpoint
- Filters data based on:
  - Current user ID (from Redux store)
  - Sport ID (passed as prop)
  - Category ID (passed as prop)

### 2. Visual Indicators

- **Weekly View**: Shows training count indicators on days with training sessions
- **Monthly View**: Displays training names and times on calendar days
- Color coding for days with training sessions

### 3. Props Added

```typescript
type TrainingCalendarProps = {
  title: string;
  titleStyle?: any;
  mainStyle?: any;
  selectedDate: moment.Moment;
  onSelectDate: (date: moment.Moment) => void;
  sportId?: string; // NEW: Sport ID for filtering
  categoryId?: string; // NEW: Category ID for filtering
};
```

## Usage Example

```tsx
import TrainingCalendar from '../components/TrainingCalendar';

// In your component
const [selectedDate, setSelectedDate] = useState(moment());
const [selectedSport, setSelectedSport] = useState(null);
const [selectedCategory, setSelectedCategory] = useState(null);

<TrainingCalendar
  title="Training Schedule"
  selectedDate={selectedDate}
  onSelectDate={setSelectedDate}
  sportId={selectedSport?._id}
  categoryId={selectedCategory?._id}
/>;
```

## API Response Structure

The component expects the API to return data in this format:

```json
{
  "message": "All training calendars fetched",
  "data": [
    {
      "_id": "68875d5303776a0ce6bf900d",
      "user": {
        "_id": "68597736da3aaaee4e1d8e56",
        "name": "Masood"
      },
      "trainingName": "Morning Fitness Session",
      "sport": {
        "_id": "6877cd7fe42c26ccd8e0b93d",
        "name": "BJJ"
      },
      "category": {
        "_id": "6877cd82e42c26ccd8e0b93e",
        "name": "Takedowns – GI"
      },
      "date": "2025-07-17T07:00:00.000Z",
      "startTime": "10pm",
      "finishTime": "11pm"
    }
  ]
}
```

## Filtering Logic

The component automatically filters the API response based on:

1. `user._id` matches the current user ID from Redux store
2. `sport._id` matches the provided `sportId` prop
3. `category._id` matches the provided `categoryId` prop

## Visual Features

### Weekly View

- Training count indicator (small circle with number)
- Background color change for days with training
- Maintains existing selection functionality

### Monthly View

- Training name displayed on calendar day
- Training time range shown
- Color-coded background for training days
- Responsive text sizing for small calendar cells

## Styling

New styles added to `styles.tsx`:

- `trainingDay`: Background color for days with training
- `trainingIndicator`: Circle indicator for training count
- `trainingIndicatorText`: Text styling for count
- `trainingInfo`: Container for training information
- `trainingName`: Training name text styling
- `trainingTime`: Training time text styling

## Error Handling

- Graceful handling of API errors
- Console logging for debugging
- Loading state management
- Fallback behavior when data is unavailable

## Dependencies

- Requires Redux store with user information
- Uses existing `getTrainingCalendars` API function
- Compatible with existing moment.js date handling
- Maintains all existing functionality
