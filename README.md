This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## TaskTracker Application
TaskTracker is a web application built using Angular that allows users to manage tasks. Users can view a list of all tasks, but to see tasks specific to them and to access additional features, they need to log in.

## Features
View All Tasks:

Access the default page to view a comprehensive list of all tasks.
## User Authentication:

Users can register and log in to access personalized task management features.
## Task Management:

Categorization of tasks by status (Open, Pending, In Progress, Completed).
Drag and drop tasks between different statuses for easy management.
Search functionality to filter tasks based on title, description, due date, or status.

## Getting Started
Prerequisites
Node.js installed
Angular CLI: Install with npm install -g @angular/cli
JSON Server for the mock API
Installation and Setup

Clone the repository: git clone https://github.com/PiusAsh/Task-Tracker

##  Install Angular dependencies:
npm install

## Install JSON Server globally:
npm install -g json-server

Run the Application
##  Start the JSON Server for the mock API:
json-server --watch db.json
Mock API will be available at http://localhost:3000/.