# Rocket-Elevators-Mobile-React-Native

This is a mobile application made with React-Native and Expo. The use of this app is to access the list of the 
Elevators that are inactive and have the possibility to put the chosen Elevator back to Active status.

# Recommended downloads

Android Studio : https://developer.android.com/studio

Ngrok (for the api paths) : https://ngrok.com/

## Usage

- `expo start` to start the application and then `a` to start in the mobile emulator

## Login Screen

The application starts by asking for an employee's email address. A verification of the entered address is done among the list of the company's employees. 
If the employee's email exists among the list the user of the App is directed to a home screen, otherwise, the user is told that the email entered is not the email of a listed agent.

## Home Screen

The welcome screen lists all the elevators that are not in operation and allows you to select one of them. When selecting an elevator from the list, the user is directed to a screen displaying the status of the selected elevator.
Under the section in charge of displaying the list, a "Log Out" button redirects the user to the login screen.


## Elevator status screen

When an elevator is selected from the list, a query is made for its current status and the status is displayed on the screen. On this screen, you can see the status of the elevator changing accordingly. When the status becomes operational, it is displayed in green. For non-operational statuses, the status is displayed in red.
Below the status display, if the status is not operational, a large button is displayed below the status to declare the end of a task on the elevator. When the button is pressed, a request is sent to update the status of the elevator to its operational status. 
Once the status update is complete, the screen queries the elevator status again. If the status is actually returned to an operational status, a required button is displayed below the status to allow you to return to the home screen. It is still possible to return to the home screen without changing the status of the elevator via a "Back" button often provided by the operating system.

## REST-API

- https://github.com/mlouellette/Rocket_Elevators_API_REST.git

## Seeding database
- https://github.com/mlouellette/Rocket-Elevators-Foundation

## Presentation video

- https://vimeo.com/787085384
