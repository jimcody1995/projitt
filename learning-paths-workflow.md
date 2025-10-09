# Learning Paths & Courses Workflow Documentation

## Overview
This document outlines the complete workflow for the Learning Paths and Courses features in the HR/Employee Management System, based on the Figma designs and existing codebase structure. The workflow covers both the creation and management of learning paths and courses, as well as the employee onboarding experience.

## Table of Contents
1. [Learning Paths Overview](#learning-paths-overview)
2. [Courses Management Overview](#courses-management-overview)
3. [Learning Path Creation Workflow](#learning-path-creation-workflow)
4. [Course Creation Workflow](#course-creation-workflow)
5. [Learning Path Management Workflow](#learning-path-management-workflow)
6. [Course Management Workflow](#course-management-workflow)
7. [Employee Onboarding Experience](#employee-onboarding-experience)
8. [API Request/Response Specifications](#api-requestresponse-specifications)
9. [Database Schema](#database-schema)
10. [Error Handling](#error-handling)

---

## Learning Paths Overview

### Main Interface Components
- **Header**: "Onboarding List" with breadcrumb navigation
- **Search Bar**: "Search learning paths" with filter capabilities
- **Action Buttons**: "Download CSV" and "Create new learning path"
- **Learning Path Cards**: Grid layout showing path details
- **Detail Panel**: Expandable side panel for detailed view
- **Full Detail View**: Complete learning path management interface

### Learning Path Card Structure
Each learning path card displays:
- **Title**: Learning path name (e.g., "Leadership Fundamentals")
- **Module Count**: Number of modules (e.g., "10 modules")
- **Duration**: Total time commitment (e.g., "20 hours")
- **Status**: Current status (Active, Draft, Archived)
- **Progress Indicators**: Visual progress representation
- **Action Menu**: Three-dot menu for additional options

---

## Courses Management Overview

### Main Interface Components
- **Header**: "Onboarding List" with breadcrumb navigation "Learning Paths / Courses"
- **Search Bar**: "Search for courses..." with filter capabilities
- **Action Button**: "Create Course" button for adding new courses
- **Courses Table**: Comprehensive table showing course details
- **Pagination**: Navigation controls for large course lists

### Course Table Structure
The courses table displays:
- **Course Name**: Title of the course (e.g., "Basic First Aid", "Communication Skills")
- **Status**: Current status with color-coded tags:
  - Purple: "Published"
  - Red: "Draft" 
  - Green: "Archived"
  - Orange: "Pending Review"
- **Type**: Course type ("Internal" or "External")
- **Duration**: Course length (e.g., "10 hrs", "12 hrs")
- **Created By**: User who created the course (e.g., "Admin", "HR Manager")
- **Created On**: Creation date (e.g., "12/03/2023")
- **Actions**: Three-dot menu for course management options

### Course Creation Types
1. **External Link**: Link to external course content
2. **Upload File**: Upload course materials (documents, videos, etc.)

---

## Learning Path Creation Workflow

### Step 1: Basic Information
**Request**: `POST /api/learning-paths`
```json
{
  "pathName": "Leadership Fundamentals",
  "description": "Essential skills for emerging leaders",
  "targetRoles": ["Design Lead", "Sales Lead", "Tech Lead"],
  "beginMonth": "2024-07-01",
  "endMonth": "2025-08-31",
  "tags": ["Leadership", "Team Management"],
  "status": "draft"
}
```

**Response**: `201 Created`
```json
{
  "id": "lp_001",
  "pathName": "Leadership Fundamentals",
  "description": "Essential skills for emerging leaders",
  "targetRoles": ["Design Lead", "Sales Lead", "Tech Lead"],
  "beginMonth": "2024-07-01",
  "endMonth": "2025-08-31",
  "tags": ["Leadership", "Team Management"],
  "status": "draft",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Step 2: Course Selection
**Request**: `POST /api/learning-paths/{pathId}/courses`
```json
{
  "courses": [
    {
      "courseId": "course_001",
      "title": "Intro to Leadership",
      "duration": "01:00:00",
      "type": "video",
      "order": 1
    },
    {
      "courseId": "course_002",
      "title": "Communication Skills",
      "duration": "02:00:00",
      "type": "video",
      "order": 2
    },
    {
      "courseId": "course_003",
      "title": "Team Building",
      "duration": "01:30:00",
      "type": "document",
      "order": 3
    }
  ]
}
```

**Response**: `200 OK`
```json
{
  "message": "Courses added successfully",
  "totalDuration": "04:30:00",
  "courseCount": 3
}
```

### Step 3: Eligibility Criteria
**Request**: `POST /api/learning-paths/{pathId}/eligibility`
```json
{
  "criteria": [
    {
      "field": "role",
      "operator": "in",
      "values": ["Design Lead", "Sales Lead", "Tech Lead"]
    },
    {
      "field": "department",
      "operator": "in",
      "values": ["Engineering", "Design", "Sales"]
    },
    {
      "field": "isManager",
      "operator": "is",
      "values": ["true"]
    }
  ],
  "logicalOperator": "AND"
}
```

**Response**: `200 OK`
```json
{
  "message": "Eligibility criteria set successfully",
  "eligibleEmployeeCount": 25,
  "eligibleEmployees": [
    {
      "id": "emp_001",
      "name": "Alice Fernandes",
      "role": "Design Lead",
      "department": "Design",
      "isManager": true,
      "email": "alice.fernandes@company.com"
    }
  ]
}
```

### Step 4: Review & Publish
**Request**: `POST /api/learning-paths/{pathId}/publish`
```json
{
  "publishDate": "2024-07-01T00:00:00Z",
  "notifyEmployees": true,
  "autoEnroll": false
}
```

**Response**: `200 OK`
```json
{
  "message": "Learning path published successfully",
  "pathId": "lp_001",
  "publishedAt": "2024-01-15T10:30:00Z",
  "notifiedEmployees": 25,
  "enrolledEmployees": 0
}
```

---

## Course Creation Workflow

### Create External Link Course
**Request**: `POST /api/courses`
```json
{
  "courseName": "Advanced Project Management",
  "type": "external",
  "externalUrl": "https://www.example.com/course",
  "description": "Comprehensive project management course covering advanced methodologies",
  "provider": "Project Management Institute",
  "duration": 12,
  "durationUnit": "hours",
  "category": "Project Management",
  "tags": ["Project Management", "Leadership", "Time Management"],
  "status": "published"
}
```

**Response**: `201 Created`
```json
{
  "id": "course_001",
  "courseName": "Advanced Project Management",
  "type": "external",
  "externalUrl": "https://www.example.com/course",
  "description": "Comprehensive project management course covering advanced methodologies",
  "provider": "Project Management Institute",
  "duration": "12:00:00",
  "category": "Project Management",
  "tags": ["Project Management", "Leadership", "Time Management"],
  "status": "published",
  "createdBy": "admin_001",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Create Upload File Course
**Request**: `POST /api/courses/upload`
```json
{
  "courseName": "Communication Skills Training",
  "type": "internal",
  "description": "Internal training materials for communication skills development",
  "duration": 8,
  "durationUnit": "hours",
  "category": "Communication",
  "tags": ["Communication", "Soft Skills", "Training"],
  "status": "draft",
  "file": "<multipart_file_data>"
}
```

**Response**: `201 Created`
```json
{
  "id": "course_002",
  "courseName": "Communication Skills Training",
  "type": "internal",
  "description": "Internal training materials for communication skills development",
  "duration": "08:00:00",
  "category": "Communication",
  "tags": ["Communication", "Soft Skills", "Training"],
  "status": "draft",
  "fileUrl": "/uploads/courses/comm_skills_001.pdf",
  "fileSize": "2.5MB",
  "createdBy": "hr_manager_001",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Get Course Library
**Request**: `GET /api/courses?search=communication&status=published&page=1&limit=10`
```json
{
  "courses": [
    {
      "id": "course_001",
      "courseName": "Advanced Project Management",
      "type": "external",
      "status": "published",
      "duration": "12:00:00",
      "category": "Project Management",
      "tags": ["Project Management", "Leadership"],
      "createdBy": "Admin",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

---

## Learning Path Management Workflow

### List Learning Paths
**Request**: `GET /api/learning-paths?status=active&page=1&limit=10&search=leadership`
```json
{
  "learningPaths": [
    {
      "id": "lp_001",
      "title": "Leadership Fundamentals",
      "subtitle": "Essential skills for emerging leaders",
      "employees": 45,
      "courses": 10,
      "status": "Active",
      "progress": 35,
      "roles": ["Design Lead", "Sales Lead", "Tech Lead"],
      "skills": ["Leadership", "Team Management"],
      "totalDuration": "20:00:00",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

### Get Learning Path Details
**Request**: `GET /api/learning-paths/{pathId}`
```json
{
  "id": "lp_001",
  "title": "Leadership Fundamentals",
  "subtitle": "Essential skills for emerging leaders",
  "description": "Comprehensive leadership development program",
  "status": "Active",
  "courses": 10,
  "employees": 45,
  "totalDuration": "20:00:00",
  "roles": ["Design Lead", "Sales Lead", "Tech Lead"],
  "skills": ["Leadership", "Team Management"],
  "beginMonth": "2024-07-01",
  "endMonth": "2025-08-31",
  "createdAt": "2024-01-15T10:30:00Z",
  "publishedAt": "2024-01-15T10:30:00Z"
}
```

### Update Learning Path
**Request**: `PUT /api/learning-paths/{pathId}`
```json
{
  "pathName": "Advanced Leadership Fundamentals",
  "description": "Updated comprehensive leadership development program",
  "status": "active"
}
```

**Response**: `200 OK`
```json
{
  "message": "Learning path updated successfully",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

### Delete Learning Path
**Request**: `DELETE /api/learning-paths/{pathId}`
**Response**: `204 No Content`

---

## Course Management Workflow

### List Courses
**Request**: `GET /api/courses?status=published&type=internal&page=1&limit=10&search=communication`
```json
{
  "courses": [
    {
      "id": "course_001",
      "courseName": "Communication Skills",
      "status": "published",
      "type": "internal",
      "duration": "10:00:00",
      "createdBy": "HR Manager",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

### Get Course Details
**Request**: `GET /api/courses/{courseId}`
```json
{
  "id": "course_001",
  "courseName": "Communication Skills",
  "type": "internal",
  "description": "Comprehensive communication skills training",
  "duration": "10:00:00",
  "category": "Communication",
  "tags": ["Communication", "Soft Skills"],
  "status": "published",
  "fileUrl": "/uploads/courses/comm_skills.pdf",
  "createdBy": "hr_manager_001",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Update Course
**Request**: `PUT /api/courses/{courseId}`
```json
{
  "courseName": "Advanced Communication Skills",
  "description": "Updated comprehensive communication skills training",
  "status": "published"
}
```

**Response**: `200 OK`
```json
{
  "message": "Course updated successfully",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

### Delete Course
**Request**: `DELETE /api/courses/{courseId}`
**Response**: `204 No Content`

### Update Course Status
**Request**: `PUT /api/courses/{courseId}/status`
```json
{
  "status": "archived",
  "reason": "Course content outdated"
}
```

**Response**: `200 OK`
```json
{
  "message": "Course status updated successfully",
  "status": "archived",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

---

## Employee Onboarding Experience

### Get Employee Learning Paths
**Request**: `GET /api/employees/{employeeId}/learning-paths`
```json
{
  "learningPaths": [
    {
      "id": "lp_001",
      "title": "Leadership Fundamentals",
      "description": "10 modules, 20 hours, Self-paced, 2024 Q1",
      "status": "assigned",
      "progress": 35,
      "modules": [
        {
          "id": "mod_001",
          "title": "Intro to Leadership",
          "status": "completed",
          "duration": "01:00:00",
          "type": "video",
          "completedAt": "2024-01-10T14:30:00Z"
        },
        {
          "id": "mod_002",
          "title": "Communication Skills",
          "status": "in_progress",
          "duration": "02:00:00",
          "type": "video",
          "startedAt": "2024-01-12T09:00:00Z"
        },
        {
          "id": "mod_003",
          "title": "Team Building",
          "status": "not_started",
          "duration": "01:30:00",
          "type": "document"
        }
      ]
    }
  ]
}
```

### Mark Module as Complete
**Request**: `POST /api/learning-paths/{pathId}/modules/{moduleId}/complete`
```json
{
  "employeeId": "emp_001",
  "completedAt": "2024-01-15T15:30:00Z",
  "timeSpent": "01:15:00"
}
```

**Response**: `200 OK`
```json
{
  "message": "Module marked as complete",
  "moduleId": "mod_002",
  "completedAt": "2024-01-15T15:30:00Z",
  "progress": 45,
  "nextModule": {
    "id": "mod_003",
    "title": "Team Building",
    "status": "available"
  }
}
```

### Mark Learning Path as Complete
**Request**: `POST /api/learning-paths/{pathId}/complete`
```json
{
  "employeeId": "emp_001",
  "completedAt": "2024-01-20T16:00:00Z"
}
```

**Response**: `200 OK`
```json
{
  "message": "Learning path completed successfully",
  "pathId": "lp_001",
  "completedAt": "2024-01-20T16:00:00Z",
  "certificateUrl": "/certificates/lp_001_emp_001.pdf"
}
```

---

## API Request/Response Specifications

### Authentication
All API requests require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Common Response Headers
```
Content-Type: application/json
X-Request-ID: <unique_request_id>
X-Response-Time: <response_time_ms>
```

### Pagination
For list endpoints, use standard pagination parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `sort`: Sort field (default: createdAt)
- `order`: Sort order (asc/desc, default: desc)

### Search and Filtering
- `search`: Text search across relevant fields
- `status`: Filter by status (draft, active, archived)
- `tags`: Filter by tags (comma-separated)
- `roles`: Filter by target roles (comma-separated)

---

## Database Schema

### Courses Table
```sql
CREATE TABLE courses (
  id VARCHAR(36) PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL,
  description TEXT,
  type ENUM('internal', 'external') NOT NULL,
  external_url VARCHAR(500),
  provider VARCHAR(255),
  duration TIME,
  category VARCHAR(100),
  status ENUM('draft', 'published', 'archived', 'pending_review') DEFAULT 'draft',
  file_url VARCHAR(500),
  file_size VARCHAR(20),
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_type (type),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
);
```

### Course Tags Table
```sql
CREATE TABLE course_tags (
  id VARCHAR(36) PRIMARY KEY,
  course_id VARCHAR(36),
  tag_name VARCHAR(100),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_course_id (course_id)
);
```

### Learning Paths Table
```sql
CREATE TABLE learning_paths (
  id VARCHAR(36) PRIMARY KEY,
  path_name VARCHAR(255) NOT NULL,
  description TEXT,
  subtitle VARCHAR(500),
  begin_month DATE,
  end_month DATE,
  status ENUM('draft', 'active', 'archived') DEFAULT 'draft',
  total_duration TIME,
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP NULL,
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

### Learning Path Modules Table
```sql
CREATE TABLE learning_path_modules (
  id VARCHAR(36) PRIMARY KEY,
  learning_path_id VARCHAR(36),
  course_id VARCHAR(36),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration TIME,
  type ENUM('video', 'document', 'quiz', 'assignment'),
  order_index INT,
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id) ON DELETE CASCADE,
  INDEX idx_learning_path_order (learning_path_id, order_index)
);
```

### Employee Learning Path Progress Table
```sql
CREATE TABLE employee_learning_path_progress (
  id VARCHAR(36) PRIMARY KEY,
  employee_id VARCHAR(36),
  learning_path_id VARCHAR(36),
  module_id VARCHAR(36),
  status ENUM('not_started', 'in_progress', 'completed', 'skipped'),
  started_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  time_spent TIME,
  progress_percentage DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
  FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id) ON DELETE CASCADE,
  FOREIGN KEY (module_id) REFERENCES learning_path_modules(id) ON DELETE CASCADE,
  UNIQUE KEY unique_employee_module (employee_id, module_id),
  INDEX idx_employee_path (employee_id, learning_path_id)
);
```

---

## Error Handling

### Standard Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "pathName",
        "message": "Path name is required",
        "value": null
      }
    ],
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456"
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` (400): Invalid input data
- `NOT_FOUND` (404): Resource not found
- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): Insufficient permissions
- `CONFLICT` (409): Resource already exists
- `INTERNAL_ERROR` (500): Server error

### Validation Rules
- **Path Name**: Required, 3-255 characters, unique per organization
- **Description**: Optional, max 2000 characters
- **Date Range**: End month must be after begin month
- **Target Roles**: At least one role must be selected
- **Modules**: At least one module must be added before publishing
- **Eligibility**: At least one criteria must be defined

---

## Workflow States and Transitions

### Course States
1. **Draft**: Initial state, can be edited freely
2. **Published**: Available for use in learning paths
3. **Archived**: No longer active, read-only
4. **Pending Review**: Awaiting approval for publication

### Learning Path States
1. **Draft**: Initial state, can be edited freely
2. **Active**: Published and available to employees
3. **Archived**: No longer active, read-only

### Module States (for employees)
1. **Not Started**: Available but not yet begun
2. **In Progress**: Currently being worked on
3. **Completed**: Finished successfully
4. **Skipped**: Marked as skipped (if allowed)

### State Transitions
**Course States:**
- Draft → Published: Course approval process
- Published → Archived: Administrative action
- Draft → Pending Review: Submitted for approval
- Pending Review → Published: Approved for publication

**Learning Path States:**
- Draft → Active: Publishing process
- Active → Archived: Administrative action

**Module States (for employees):**
- Not Started → In Progress: Employee starts module
- In Progress → Completed: Employee finishes module
- In Progress → Not Started: Employee resets progress (if allowed)

---

## Performance Considerations

### Caching Strategy
- Cache learning path lists for 5 minutes
- Cache course library for 15 minutes
- Cache eligible employee lists for 10 minutes
- Use Redis for session-based caching

### Database Optimization
- Index on frequently queried fields
- Use materialized views for complex eligibility queries
- Implement database connection pooling
- Consider read replicas for reporting queries

### API Rate Limiting
- 100 requests per minute per user
- 1000 requests per minute per organization
- Implement exponential backoff for retries

---

## Security Requirements

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Organization-level data isolation
- API key validation for external integrations

### Data Protection
- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement input sanitization
- Prevent SQL injection and XSS attacks

### Audit Logging
- Log all learning path modifications
- Track employee progress changes
- Monitor API access patterns
- Generate compliance reports

---

This workflow documentation provides a comprehensive guide for implementing and managing the Learning Paths feature, ensuring consistency between the Figma design and the backend implementation.
