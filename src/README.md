# CQ-Frontend
## Structure
The frontend is structured in:
- Views,
- Components and
- Data Services.

A view can be one of the following:
- a dashboard view,
- a detail view
- an edit view
- or something very special.

A component is something that will be reused, like a 
list entry.

## Creating a new view:

To create a view for a new model, three things are required:
- A Data Service that defines the communication to the server
  - this includes a Type/Interface defining a model
- A View, which imports the components and talks to the data service
- The components which present the data
