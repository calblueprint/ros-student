# Roots of Success
The production application is located at https://ros-student-production.herokuapp.com. This is the **student entry portal**, which only students should use. Admin access a different entry portal described below.

## Admin Portal
The admin portal is located at https://ros-student-production.herokuapp.com/admins/sign_in. You can sign in if you have administrator credentials. The Admin Portal is the second of the two entry points into our application, and contains primarily the following pages.

### Course Module Grid
This is the landing page upon logging in to the application. It contains a list of all the **currently existing courses** on the application platform as well as a method for **creating a brand new course**. Each course is represented as a card and upon clicking the card, the admin is taken to the Course Edit Page.

### Course Edit Page
The admins' main functionality in editing and adding course content is hosted on thie page. The names of all label fields, including course title, description, section titles, and subsection titles can be edited inline, and are immediately saved upon clicking out of the field. Components, the lowest level structure on this page, can be edited via a pop-up modal upon clicking a particular component.

#### Components
There are three types of components, which can be used to build a course:
* **Slide components** primarily contain an image, representing a presentation slide
* **Quiz components** link to a Google Forms quiz, which will be embedded inside the app in the student course. Quiz components must contain a *secret key*, which the Google Form should display upon the form's completion. This allows verification that the student completed a quiz and can move on
* **Multimedia components** link to a YouTube video, which is also embedded inside the student course. The navigation/scrubbing controls are disabled for the video, so the student necessarily has to finish the video to continue to the next component in the course

#### Audio
In addition, every type of component has an additional *optional* audio file, which is embedded below the main body of the component. This is to account for the case that students are studying self-paced with the application and do not have a teacher to provide instuctions. The audio will then serve as a replacement for the teacher's prompts.

#### Deletion
All parts of a course can be deleted via the delete buttons along the right side. The entire course may also be deleted if so desired upon entering a verification.

### Users Page
This is the first tab on the navbar after the Roots of Success logo. It contains an index of all the students currently enrolled in the platform and a list of all the admins. An administrator can create another administrator by entering an email to which a prompt will be sent with instructions on how to create an admin account. This is currently a WIP, and will in the future be able to display a student's progress in all enrolled courses, and also possibly various convenience functions like search.

### Tools Page
This is the second tab on the navbar, and contains a utility function for admins to export and import courses. The course data will be packaged and exported as a JSON file. If desired, an admin can choose to export a course, make edits, and reimport it as a brand new course. This can also be used as a method for backing up courses so that they can be reloaded in case they are somehow lost.

### Codes Page
Admins have the ability to generate registration codes to enroll new students into a course. The top level button provides the option to generate a set of any number of codes associated with a particular context (a class in Berkeley, CA, for example). The admin will choose the courses for which those registration codes can enroll students for, and upon submission will store codes onto the server which can be downloaded as a file. The teacher/administrator may then choose how to distribute the codes to students afterwards. Students who use the codes to create a new account

### Profile Page
Upon hovering over the admin name, the Profile Page may be accessed through the Profile dropdown button. This interface provides basic utilities such as the ability to change password, edit email, and so on.
