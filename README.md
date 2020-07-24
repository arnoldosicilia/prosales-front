![IronHack Logo](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_d5c5793015fec3be28a63c4fa3dd4d55.png)
# IronHack Final Project - PROSALES

## <a name="goal"></a>Goal
The main objective of this project is to apply all the knowledge acquired throughout the bootcamp creating a web application with a backend in Springboot and a frontend in Angular, always applying good practices. My application consists of a collection management system for small businesses. where you can register / edit customers, and create new purchases. If you have administrator permissions you will be allowed to edit different elements.
- [eureka-server
](#): This is the Eureka server which will be used to orchestrate all the running services, you can check that Eureka is running and the subsequent microservices connected to it in [http://localhost:8761/
](http://localhost:8761/).
- [edge-service
](#): This service is used as the entry point of the application. It is placed on the 8080 port and will handle all further requests attached to the rest of microservices, it is also responsible for controlling the security of the API to access the endpoints.
- [User-service
](#): This service manages the User and their roles and registry both of them in a SQL database.
- [Clients-service
](#): The client service manage the registration of new clients by the user;
- [Product-service
](#): Products service manage the acces to the products database wich is bobulated wich some data extraced from a web scratching and stores them in a SQL database.
- [Sales-service
](#): This service register the sales in a MongoDB.
- [Providers-service & Company-service
](#): Where created to add more complexity to this project in the future that i was not vbe able to add now due to the time constraint.

#### How it Works
In order to get the whole project up and running, you must first start the Eureka Server and then all of the services. You can do this either clicking "Run" on the Main Class of each project or typing "mvn spring-boot:run" in the terminal, once located in the project directory.
Then you can either check the Swagger Documentation below, which will provide you with all the routes and its functioning, or check the [edge-service
](#) where all the main routes are allocated in each controller.

## <a name="documentation"></a>Documentation
1. When you have al the proyects runing, enter [THIS LINK](http://localhost:8080//swagger-ui.html#/) you'll find the configuration of all the endpoints on the application.
## <a name="test-coverage"></a>Test Coverage
You can check all the unit and integration tests in each project by clicking "Run all tests with Coverage" in the main folder once opened in IntelliJ.
the test coverage is above 80% in all the services.
All routes have been tested and can be checked either with Postman or Swagger.
