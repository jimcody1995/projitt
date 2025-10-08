# Learning Paths API Specification

## Overview
This document outlines the backend API requirements for the "Create Learning Paths" feature in the HR/Employee Management System. The feature allows HR administrators to create structured learning paths for employee development and onboarding.

## Feature Flow
The learning path creation process consists of 4 sequential steps:
1. **Basic Info** - Define fundamental learning path details
2. **Course Selection** - Add and organize courses
3. **Eligibility Criteria** - Define target audience
4. **Review & Publish** - Final review and activation

---

## API Endpoints Required

### 1. Learning Path Management

#### Create Learning Path
```
POST /api/learning-paths
```
**Request Body:**
```json
{
  "pathName": "A.G. Leadership Fundamentals",
  "description": "Comprehensive leadership development program for experienced Senior Data Analysts...",
  "targetRoles": ["Brand Designer", "UX Designer"],
  "beginMonth": "2024-07-01",
  "endMonth": "2025-08-31",
  "tags": ["Leadership", "Team Management"],
  "status": "draft" // draft, published, archived
}
```

#### Update Learning Path
```
PUT /api/learning-paths/{id}
```

#### Get Learning Path
```
GET /api/learning-paths/{id}
```

#### List Learning Paths
```
GET /api/learning-paths?status=draft&page=1&limit=10
```

#### Delete Learning Path
```
DELETE /api/learning-paths/{id}
```

### 2. Course Management

#### Get Course Library
```
GET /api/courses?search={query}&page=1&limit=20
```
**Response:**
```json
{
  "courses": [
    {
      "id": "course_001",
      "title": "Leadership 101",
      "duration": "02:00:00", // hours:minutes:seconds
      "description": "Course description...",
      "category": "Leadership",
      "difficulty": "beginner",
      "isActive": true
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 20
}
```

#### Add Course to Learning Path
```
POST /api/learning-paths/{pathId}/courses
```
**Request Body:**
```json
{
  "courseId": "course_001",
  "order": 1
}
```

#### Remove Course from Learning Path
```
DELETE /api/learning-paths/{pathId}/courses/{courseId}
```

#### Reorder Courses in Learning Path
```
PUT /api/learning-paths/{pathId}/courses/reorder
```
**Request Body:**
```json
{
  "courseOrders": [
    {"courseId": "course_001", "order": 1},
    {"courseId": "course_002", "order": 2}
  ]
}
```

### 3. Eligibility Criteria Management

#### Set Eligibility Criteria
```
POST /api/learning-paths/{pathId}/eligibility
```
**Request Body:**
```json
{
  "criteria": [
    {
      "field": "role",
      "operator": "is",
      "values": ["Brand Designer", "UX Designer"]
    },
    {
      "field": "isManager",
      "operator": "is",
      "values": ["true"]
    },
    {
      "field": "department",
      "operator": "in",
      "values": ["Engineering", "Design"]
    }
  ],
  "logicalOperator": "AND" // AND, OR
}
```

#### Get Eligible Employees
```
GET /api/learning-paths/{pathId}/eligible-employees
```
**Response:**
```json
{
  "eligibleEmployees": [
    {
      "id": "emp_001",
      "name": "Alice Fernandes",
      "role": "Senior Data Analyst",
      "department": "Engineering",
      "isManager": true,
      "email": "alice.fernandes@company.com"
    }
  ],
  "totalCount": 25
}
```

### 4. Learning Path Publishing

#### Publish Learning Path
```
POST /api/learning-paths/{pathId}/publish
```
**Request Body:**
```json
{
  "publishDate": "2024-07-01T00:00:00Z",
  "notifyEmployees": true,
  "autoEnroll": false
}
```

#### Get Learning Path Summary
```
GET /api/learning-paths/{pathId}/summary
```
**Response:**
```json
{
  "pathName": "A.G. Leadership Fundamentals",
  "description": "Full description...",
  "targetRoles": ["Brand Designer", "UX Designer"],
  "beginMonth": "2024-07-01",
  "endMonth": "2025-08-31",
  "tags": ["Leadership", "Team Management"],
  "eligibleEmployeeCount": 25,
  "courseCount": 20,
  "totalDuration": "40:00:00",
  "status": "draft"
}
```

---

## Database Schema Requirements

### Learning Paths Table
```sql
CREATE TABLE learning_paths (
  id VARCHAR(36) PRIMARY KEY,
  path_name VARCHAR(255) NOT NULL,
  description TEXT,
  begin_month DATE,
  end_month DATE,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP NULL
);
```

### Learning Path Tags Table
```sql
CREATE TABLE learning_path_tags (
  id VARCHAR(36) PRIMARY KEY,
  learning_path_id VARCHAR(36),
  tag_name VARCHAR(100),
  FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id) ON DELETE CASCADE
);
```

### Learning Path Target Roles Table
```sql
CREATE TABLE learning_path_target_roles (
  id VARCHAR(36) PRIMARY KEY,
  learning_path_id VARCHAR(36),
  role_name VARCHAR(100),
  FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id) ON DELETE CASCADE
);
```

### Learning Path Courses Table
```sql
CREATE TABLE learning_path_courses (
  id VARCHAR(36) PRIMARY KEY,
  learning_path_id VARCHAR(36),
  course_id VARCHAR(36),
  order_index INT,
  FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
```

### Learning Path Eligibility Criteria Table
```sql
CREATE TABLE learning_path_eligibility (
  id VARCHAR(36) PRIMARY KEY,
  learning_path_id VARCHAR(36),
  field_name VARCHAR(100), -- role, department, isManager, etc.
  operator VARCHAR(20), -- is, in, not_in, greater_than, etc.
  field_values JSON, -- array of values
  logical_operator VARCHAR(10), -- AND, OR
  order_index INT,
  FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id) ON DELETE CASCADE
);
```

---

## Business Logic Requirements

### 1. Validation Rules
- **Path Name**: Required, max 255 characters, unique per organization
- **Description**: Optional, max 2000 characters
- **Date Range**: End month must be after begin month
- **Target Roles**: At least one role must be selected
- **Courses**: At least one course must be added before publishing
- **Eligibility**: At least one criteria must be defined

### 2. Eligibility Engine
The system needs to evaluate employee eligibility based on:
- **Role matching**: Check if employee role matches target roles
- **Department filtering**: Filter by department
- **Manager status**: Check if employee is a manager
- **Custom fields**: Support for additional employee attributes
- **Logical operators**: Support AND/OR combinations

### 3. Course Management
- **Drag & Drop Reordering**: Maintain course order in learning path
- **Duplicate Prevention**: Prevent adding same course multiple times
- **Duration Calculation**: Calculate total learning path duration
- **Prerequisites**: Support course prerequisites (future enhancement)

### 4. Publishing Workflow
- **Validation**: Ensure all required fields are completed
- **Employee Notification**: Send notifications to eligible employees
- **Auto-enrollment**: Option to automatically enroll eligible employees
- **Progress Tracking**: Initialize progress tracking for enrolled employees

---

## Integration Points

### 1. Employee Management System
- Fetch employee data for eligibility evaluation
- Get employee roles, departments, and attributes
- Update employee learning records

### 2. Course Management System
- Fetch available courses from course library
- Get course details (duration, description, etc.)
- Track course completion status

### 3. Notification System
- Send learning path assignment notifications
- Email notifications for new learning paths
- In-app notifications for eligible employees

### 4. Analytics & Reporting
- Track learning path completion rates
- Generate reports on employee progress
- Monitor learning path effectiveness

---

## Error Handling

### Common Error Scenarios
1. **Validation Errors**: Return 400 with specific field errors
2. **Not Found**: Return 404 for non-existent learning paths
3. **Permission Errors**: Return 403 for unauthorized access
4. **Duplicate Data**: Return 409 for duplicate entries
5. **Server Errors**: Return 500 with generic error message

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "pathName",
        "message": "Path name is required"
      }
    ]
  }
}
```

---

## Performance Considerations

### 1. Caching
- Cache course library data
- Cache eligible employee lists
- Cache learning path summaries

### 2. Pagination
- Implement pagination for course library
- Paginate eligible employees list
- Support large employee datasets

### 3. Database Optimization
- Index on learning_path_id for related tables
- Index on employee attributes for eligibility queries
- Consider materialized views for complex eligibility queries

---

## Security Requirements

### 1. Authentication & Authorization
- Require valid JWT token for all endpoints
- Role-based access control (HR admins only)
- Organization-level data isolation

### 2. Data Validation
- Sanitize all input data
- Validate file uploads (if any)
- Prevent SQL injection and XSS attacks

### 3. Audit Logging
- Log all learning path creation/modification activities
- Track employee enrollment and progress
- Maintain audit trail for compliance

---

## Future Enhancements

### 1. Advanced Features
- Learning path templates
- Bulk learning path creation
- Learning path analytics dashboard
- Integration with external learning platforms

### 2. Mobile Support
- Mobile-optimized API responses
- Offline learning path access
- Push notifications for mobile apps

### 3. AI/ML Integration
- Personalized learning path recommendations
- Automatic course suggestions
- Learning outcome predictions

---

## Testing Requirements

### 1. Unit Tests
- Test all API endpoints
- Test business logic functions
- Test data validation rules

### 2. Integration Tests
- Test eligibility engine
- Test course management
- Test publishing workflow

### 3. Performance Tests
- Test with large employee datasets
- Test concurrent learning path creation
- Test API response times

---

This specification provides a comprehensive foundation for implementing the Learning Paths feature backend. The developer should implement these endpoints and business logic to support the frontend workflow shown in the UI mockups.
