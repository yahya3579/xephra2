# Real-Time Notification System Integration Guide

## Overview
This guide shows you exactly how to integrate the notification system into your existing Xephra2 app. The notifications will display in the following locations:

### For Users:
- **Notification Bell**: In the user dashboard header (next to theme toggle)
- **Notifications**: Dropdown panel showing user-specific notifications

### For Admins:
- **Notification Bell**: In the admin dashboard header (next to theme toggle)
- **Admin Panel**: Full-screen notification management panel (as a dashboard section)

---

## Integration Steps

### Step 1: Update Admin Header Component

Replace the existing notification button in `Client/src/components/AdminDashobard/Header.js`:

```javascript
import React from "react";
import { Link } from "react-router-dom";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { IoMoonSharp } from "react-icons/io5";
import { ImBrightnessContrast } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
// ADD THIS IMPORT
import NotificationBell from "../Notifications/NotificationBell";

export default function Header({
  dark,
  toggleSideMenu,
  toggleTheme,
  profileImage,
  onMenuClick, 
  profile,
}) {
  // ADD THIS LINE
  const { user } = useSelector((state) => state.auth);

  return (
    <header className={`z-10 py-4`}>
         <div className="container flex items-center justify-between h-full px-6 mx-auto text-white dark:text-white">
           {/* Menu Button */}
           <button
             className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-white"
             onClick={toggleSideMenu}
             aria-label="Menu"
           >
             <BsFillMenuButtonWideFill />
           </button>
   
           {/* Right-side Buttons */}
           <div className="flex items-center space-x-4 ml-auto">
             {/* Dark Mode Toggle */}
             <button
               onClick={toggleTheme}
               className="p-1 text-white rounded-full focus:outline-none hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-700"
               aria-label="Toggle Dark Mode"
             >
               {dark ? (
                 <ImBrightnessContrast className="text-[#C9B796]" />
               ) : (
                 <IoMoonSharp className="text-[#C9B796]" />
               )}
             </button>
   
             {/* REPLACE THE EXISTING NOTIFICATION BUTTON WITH THIS */}
             <NotificationBell 
               userId={user?._id}
               userType="admin"
               isAdmin={true}
             />
   
             {/* Profile Image */}
             <Link>
               <div
                 className="flex flex-row justify-center items-center"
                 onClick={() => onMenuClick("adminProfile")}
               >
                 <p className="me-2">
                   {profile?.username ? profile?.username : "username"}
                 </p>
                 <img
                   src={
                     profile?.profileImage
                       ? `http://localhost:5000/${profile?.profileImage}`
                       : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvyKxD07vzVrTXqVFK0myyV8KT99ZWBNNwGA&s"
                   }
                   alt="Profile"
                   className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 object-cover"
                 />
               </div>
             </Link>
           </div>
         </div>
       </header>
  );
}
```

### Step 2: Update User Header Component

Similarly, update `Client/src/components/UserDashobard/Header.js`:

```javascript
// Add the import at the top
import NotificationBell from "../Notifications/NotificationBell";

// Add this line inside the component
const { user } = useSelector((state) => state.auth);

// Replace the notification button section with:
<NotificationBell 
  userId={user?._id}
  userType="user"
  isAdmin={false}
/>
```

### Step 3: Add Admin Notification Panel to Dashboard

Update `Client/src/pages/AdminDashboard/Dashboard.js`:

```javascript
// Add import at the top
import AdminNotificationPanel from "../../components/Notifications/AdminNotificationPanel";

// Add "notifications" to your menu items in AdminMenus.js or add it directly here
// In the renderContent function, add this case:
const renderContent = () => {
  switch (activeMenu) {
    case "dashboard":
      return <Dashboardadmin />;
    case "postedEvents":
      return <PostedEvents />;
    case "newEvents":
      return <NewEvents />;
    case "rankingApproval":
      return <RankingApproval />;
    case "CompletedEvents":
      return <CompletedEvents />;
    case "rankingBoard":
      return <RankingBoard />;
    case "adminProfile":
      return <AdminProfile />;
    // ADD THIS CASE
    case "notifications":
      return <AdminNotificationPanel />;
    default:
      return <Dashboardadmin />;
  }
};
```

### Step 4: Update Menu Items

Update `Client/src/components/AdminDashobard/AdminMenus.js` to include notifications:

```javascript
export const menuItems = [
  { key: "dashboard", name: "Dashboard" },
  { key: "postedEvents", name: "Posted Events" },
  { key: "newEvents", name: "New Events" },
  { key: "CompletedEvents", name: "Completed Events" },
  { key: "rankingBoard", name: "Ranking Board" },
  { key: "rankingApproval", name: "Ranking Approval" },
  // ADD THIS LINE
  { key: "notifications", name: "Notifications" },
  { key: "PaymentPanel", name: "Payment Panel" },
  { key: "adminProfile", name: "Profile" },
];
```

### Step 5: Add Background Images for Notifications

Add to the backgroundImages object in both Dashboard components:

```javascript
const backgroundImages = {
  dashboard: { light: bgLight, dark: bgDark },
  postedEvents: { light: bgUpcomingLight, dark: bgUpcomingDark },
  newEvents: { light: bgRegisteredLight, dark: bgRegisteredDark },
  rankingBoard: { light: bgRankingBoardLight, dark: bgRankingBoardDark },
  CompletedEvents: { light: bgCompletedEventsLight, dark: bgCompletedEventsDark },
  rankingApproval: { light: bgRankingApprovalLight, dark: bgRankingApprovalDark },
  adminProfile: { light: bgProfileLight, dark: bgProfileDark },
  // ADD THIS LINE (you can use existing backgrounds or create new ones)
  notifications: { light: bgLight, dark: bgDark },
};
```

### Step 6: Install Required Dependencies

Run this command in your Client folder:

```bash
npm install socket.io-client
```

### Step 7: Initialize Socket Connection

Create `Client/src/utils/socket.js`:

```javascript
import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId) {
    if (!this.socket) {
      this.socket = io('http://localhost:5000', {
        transports: ['websocket'],
        upgrade: true,
      });

      this.socket.on('connect', () => {
        console.log('Connected to server');
        if (userId) {
          this.socket.emit('join', userId);
        }
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }
}

export default new SocketService();
```

### Step 8: Initialize Socket in App.js

Update `Client/src/App.js`:

```javascript
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import socketService from './utils/socket';

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      socketService.connect(user._id);
    }

    return () => {
      if (!isAuthenticated) {
        socketService.disconnect();
      }
    };
  }, [isAuthenticated, user]);

  // ... rest of your App.js code
}
```

---

## How It Works

### User Notifications Display:
1. **User Dashboard Header**: Bell icon with red badge showing unread count
2. **Click Bell**: Dropdown panel showing recent notifications
3. **Types**: Subscription status, event posts, rankings, game results

### Admin Notifications Display:
1. **Admin Dashboard Header**: Bell icon with red badge showing unread count
2. **Click Bell**: Dropdown panel for quick view
3. **Notifications Menu**: Full admin panel for managing all notifications
4. **Types**: User submissions, registrations, game entries, payment updates

### Real-time Features:
- ✅ Instant notifications via Socket.IO
- ✅ Browser notifications (with permission)
- ✅ Sound alerts for important updates
- ✅ Auto-refresh notification count
- ✅ Mark as read functionality
- ✅ Filter by type and priority

---

## File Structure After Integration

```
Client/src/
├── components/
│   ├── Notifications/
│   │   ├── NotificationBell.js          ← Dropdown component (Tailwind CSS)
│   │   └── AdminNotificationPanel.js    ← Full admin panel (Tailwind CSS)
│   ├── AdminDashobard/
│   │   └── Header.js                    ← Updated with NotificationBell
│   └── UserDashobard/
│       └── Header.js                    ← Updated with NotificationBell
├── utils/
│   └── socket.js                        ← Socket connection manager
└── pages/
    ├── AdminDashboard/
    │   └── Dashboard.js                 ← Added notification panel
    └── UserDashboard/
        └── Dashboard.js                 ← Ready for notifications
```

---

## Testing the Integration

1. **Start your backend server**: `npm start` in Backend folder
2. **Start your frontend**: `npm start` in Client folder
3. **Login as admin and user** in different browsers
4. **Trigger notifications**:
   - User: Submit a subscription → Admin gets notification
   - Admin: Approve subscription → User gets notification
   - Admin: Post event → All users get notification
   - User: Register for event → Admin gets notification

---

## Customization Options

### Styling:
- **Tailwind CSS Classes**: All components use Tailwind for responsive design
- **Theme Colors**: Matches your existing color scheme (#D19F43, #2a2a2a, #333)
- **Dark/Light Mode**: Automatic support with existing Tailwind dark mode
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Sounds:
- Enable/disable notification sounds
- Different sounds for different priorities
- Volume control

### Behavior:
- Auto-mark as read after viewing
- Notification persistence (7 days default)  
- Real-time badge updates

**Tailwind Customization Examples:**
```javascript
// Change notification bell color
<div className="text-[#YOUR_COLOR] text-xl">🔔</div>

// Modify dropdown background
<div className="bg-[#YOUR_BG_COLOR] rounded-lg shadow-2xl">

// Update button styles
<button className="bg-[#YOUR_COLOR] hover:bg-[#YOUR_HOVER_COLOR] px-4 py-2 rounded">
```

The notification system is now fully integrated and ready to use! 🔔
