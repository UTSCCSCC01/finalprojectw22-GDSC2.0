## Product Backlog

<ol>
<details open>
<summary><strong>Account & Profile</strong></summary>
    <li>As a visitor, I can register an account , so I can become a member in the club.
    <ul>
        <li>Visitor can register an account by providing email and password.</li>
        <li>Email verification is required</li>
    </ul>
    <br>
    <li>As a member (student or mentor), I can log in using my email and password, so I can view the website in a member's view.
    <ul>
        <li>Member can log in using email and password.</li>
    </ul>
    </li>
    <br>
    </ul>
    <li>As a member (student or mentor), I can reset my password via email verification, so I don't lose my account.
    <ul>
        <li>A forget password link is available in login apge</li>
        <li>Reset password action is executed after recieving a correct and registered email address.</li>
    </ul>
    </li>
    <br>
    <li>As a member (student or mentor), I can fill out common information in the profile page, so I don't need to fill out those infomation again in the application.
    <ul>
        <li>User have an editable profile page.</li>
        <li>Once an applcation is initiated by a member, the server scans the profile of that member and fill in some sections in the application form based on the member's profile.</li>
    </ul>
    </li>
    <br>
    <li>As a member (student or mentor), I can link my github and linkedin page in my profile, so I can showcase my experience.
    <ul>
        <li>Desinated and integrated section for github and linkedin link</li>
    </ul>
    </li>
    <br>
    <li>As a member (student or mentor), I can view my past projects, so I can revisit the projects and provide projects' information to other people.
    <ul>
        <li>A project tab show up after clicking on the account icon.</li>
        <li>A listing of project that the user participated or in progress.</li>
    </ul>
    </li>
    <br>
    <li>As a group of site admins, we want our profiles posted on a single page linked with Home page, so people know we are the admins.
    <ul>
        <li>A page of all site admins information.</li>
        <li>Admins information is consisted of a picture, name ,position and short description.</li>
        <li>Admins can link there picture and name to their personal website.</li>
    </ul>
    </li>
    <br>
    <li>As a group of site admins, we can post past projects' profile , so we can showcase our projects.
    <ul>
        <li>A listing of past projects in a page.</li>
        <li>An interface designated for admins to add past project.</li>
    </ul>
    </li>
</details>
<br>
<details open>
<summary><strong>Project Initiatives Portal</strong></summary>
    <li>As a site admin, I can create project initiatives, so I can show projects initiatives to candidates.
    <ul>
        <li>A designated interface for admins to add or delete project initiatives</li>
    </ul>
    </li>
    <br>
    <li>As a member (student or mentor), I can scroll through a listing of active project initiatives, so I can see if there is any project that I am interested in.
    <ul>
        <li>A page with a listing of active project.</li>
    </ul>
    </li>
    <br>
    <li>As a member (student or mentor), I can click on the project initiatives and it brings me to a page or a pop up window, so I get to know more details about the project.
    <ul>
        <li>Clicking on the active project intiatives redirect the user to a page that contains the details about the project intiative.</li>
        <li>Each active project initiatives have a page.</li>
    </ul>
    </li>
    <br>
    <li>As a member (student or mentor), I can add preferences to the existing project initiatives, so I can show admins or mentors my preferences.
    <ul>
        <li>A preference icon at the top right corner of a project initiative in the project listing page.</li>
        <li>Default for all project preference of a user is no-preference.</li>
        <li>Members can change their preferences</li>
    </ul>
    </li>
</details>
<br>
<details open>
<summary><strong>Project Application</strong></summary>
    <li>As a member (student or mentor), I want to get an email notification when my application status has been updated, so I can start to view project initiatives or prepare to apply in the next term.
    <ul>
        <li>Application accept button aliasing with a email sending action,which email is sent to the email address provied in the application.</li>
    </ul>
    </li>
    <br>
    <li>As a site admin, I want to format an acceptance email template, so I can send that email to all applicants once they are accepted.
    <ul>
        <li>An interface allow site admins to modify the email format which will be sent to a group of users.</li>
    </ul>
    </li>
    <br>
    <li>As a site admin or mentor, I can see a list of pending applications and a list of approved applicants, so I can view their application information and profiles.
    <ul>
        <li>A list of pending applications.</li>
        <li>Clicking on the application pops up of window containing application details and a accept button at the bottom of the popup window.</li>
        <li>A list of approved applicants.</li>
        <li>Clicking on the approved applicants redirects to their profile pages.</li>
    </ul>
    </li>
    <br>
    <li>As a a site admin or mentor, I can sort or filter applicants based on common information, like cgpa, etc, so I can spend less time on seeking potential candidates.
    <ul>
        <li>A filter and sort section built in pending applications page.</li>
        <li>Filter and sort section allows admin or mentor to sort and filter based on specific criteria.</li>
    </ul>
    </li>
    <br>
</details>
<br>
<details open>
<summary><strong>Project</strong></summary>
    <li>As a member in a project , I want a page of the project for my team, so I can view my project details.
    <ul>
        <li>Each project in progress has a page with project details.</li>
    </ul>
    </li>
    <br>
    <li>As a member (student and mentor) in a project, I can view a listing of project partners in the same project, so I can contact them and know their information.
    <ul>
        <li>Each member in the same projects has ownership to the project. Their user IDs are included in project profile.</li>
        <li>Member profile links are listed in the project page.</li>
    </ul>
    </li>
    <br>
    <li>As a site admin, I can remove candidates from or add candidates to an existing project team, so the team formation can be flexible.
    <ul>
        <li>An project interface for site admins that allows admins to modify the formation of a group.</li>
        <li>Email is sent to the members once changes are made.</li>
    </ul>
    </li>
</details>
<br>
<details open>
<summary><strong>Events</strong></summary>
    <li>As a site admin, I can publish events,so new events will be posted on the website.
    <ul>
        <li>In admins view of the event page, there is an add event button.</li>
        <li>A request of event is submitted after required fields are filled in add event page.</li>
        <li>Events are published once head admin approves.</li>
    </ul>
    </li>
    <br>
    <li>As a user (visitor, student or mentor), I can see a listing of upcoming events, so I can see if there is any event that I am interested in.
    <ul>
        <li>A page of listing of upcoming events which allows all users to see.</li>
    </ul>
    </li>
    <br>
    <li>As a user (visitor, student or mentor), I can view the past events and event descriptions, so I can make prediction of the events in the future.
    <ul>
        <li>A page of listing of past events which allows all users to see</li>
    </ul>
    </li>
    <br>
    <li>As a site admin, I can pull all the information of past events, so I don't need to re-write everything for similar events.
    <ul>
        <li>A page of listing of past events which allows all users to see and click on.</li>
        <li>Admin can export the past event's setting and description in order to use in creating new events.</li>
    </ul>
    </li>
</details>
<br>
</ol>

