import React, { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Twitch,
  Mail,
  MapPin,
  Phone,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from "../../assets/xephra logo-01.png";

const Footer = ({ handleNavClick }) => {
  const [activePolicy, setActivePolicy] = useState(null);

  // Policy content data
  const policyContent = {
    privacy: `Privacy Policy
Effective Date: [April 2025]
  
Welcome to Xephra — a gaming platform where users join events, chat in groups and privately with admins, view rankings, and participate in a competitive gaming community. We value your trust and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, share, and protect your information when you use our website and services.
  
  1. Information We Collect
  When you use Xephra, we may collect the following types of information:
  
  a. Personal Information
  Name, username, and profile picture
  
  Email address and contact information
  
  Payment and subscription details (via third-party payment processors)
  
  b. Account and Activity Data
  Events you join or participate in
  
  Messages you send in event group chats or in private with admins
  
  Game-related actions, scores, performance, and rankings
  
  Suspensions, reports, or rule violations related to your account
  
  c. Technical Information
  IP address, browser type, operating system, and device type
  
  Date and time of access
  
  Usage logs and activity tracking
  
  2. How We Use Your Information
  We use your data to provide, maintain, and improve our services, including:
  
  Enabling you to join events and track your participation
  
  Allowing chat functionality within event groups and with admins
  
  Displaying user profiles and public rankings
  
  Processing payments and managing your subscription status
  
  Monitoring user behavior to detect cheating or rule violations
  
  Providing support and resolving disputes
  
  Sending notifications, updates, and event-related communications
  
  Enforcing our Terms of Service and Community Guidelines
  
  3. User Profiles, Rankings, and Public Data
  Your username, profile, ranking, and event performance may be displayed to other users. This is a core feature of the platform, designed to encourage competition and community engagement.
  
  Note: Private data such as email addresses and payment details are never shared publicly.
  
  4. Chat Features and Data Monitoring
  Xephra includes group chats for events and one-on-one messaging between users and admins. These chats are stored securely and may be monitored by admins:
  
  To ensure fair play and respectful communication
  
  To investigate reports of abuse, harassment, or cheating
  
  To improve moderation and community support
  
  By using these chat features, you agree to this monitoring for safety and compliance purposes.
  
  5. Role of Admins and Moderation Rights
  Xephra admins are responsible for maintaining the integrity of the platform. Admins may access user data (including chats and event history) for:
  
  Handling rule violations and cheating reports
  
  Managing user accounts and suspensions
  
  Supporting users and answering queries
  
  Ensuring a fair and enjoyable gaming experience
  
  Admins reserve the right to take appropriate action if users are found violating rules, including issuing warnings, temporary bans, or permanent suspension.
  
  6. Payments and Subscriptions
  Xephra offers paid features and event participation options. All payment transactions are handled securely by trusted third-party processors (e.g., Stripe, PayPal).
  
  We do not store your full credit/debit card details. However, we may store limited transaction metadata such as subscription type, renewal dates, and payment status.
  
  7. How We Share Your Information
  We do not sell your personal information. We may share it only in the following cases:
  
  With Service Providers: For hosting, data storage, payment processing, and analytics.
  
  For Legal Purposes: If required by law or in response to legal proceedings.
  
  To Protect Xephra: When necessary to enforce our Terms or protect our rights, users, and community.
  
  8. Security Measures
  We implement technical, administrative, and physical safeguards to protect your personal data. This includes:
  
  Data encryption
  
  Secure server hosting
  
  Access controls and authentication
  
  Regular audits and monitoring
  
  While we strive to use commercially acceptable means to protect your information, no method of transmission over the Internet is 100% secure.
  
  9. Your Rights and Choices
  You have the right to:
  
  Access, update, or delete your personal data
  
  Change your communication preferences
  
  Cancel your account at any time
  
  Request a copy of your stored data
  
  
  10. Data Retention
  We retain your data only for as long as necessary to provide our services or as required by law. If you cancel your account, we will delete or anonymize your personal information unless we are required to retain it for legitimate business or legal purposes.
  
  11. Children's Privacy
  Xephra is not designed for children under the age of 13. If we learn that we have collected personal data from a child without parental consent, we will delete it promptly.
  
  12. International Users
  If you are accessing Xephra from outside your home country, be aware that your data may be transferred to and processed in other countries where our servers or service providers are located.
  
  13. Changes to This Policy
  We may update this Privacy Policy from time to time. We will notify you of any significant changes via email or through the website. Continued use of Xephra after changes indicates your acceptance of the new terms.
  
  14. Contact Us
  If you have questions, concerns, or requests regarding your privacy, you can reach us at:
  Address:Al Ghurair Giga Westria road, Plaza No #34 2nd Floor, DHA phase 2, Islamabad
  Phone Number: +92-300-0692222, +92 339 0018363`,

    refund: `Refund Policy

Effective Date: [April 2025]

At Xephra, we strive to ensure that our users have a positive experience. However, due to the nature of our digital services, certain conditions apply to our refund policy. Please read the following refund policy carefully before making any purchases on our website.

1. Subscription-Based Services
Xephra offers subscription plans to access premium features, exclusive events, and other functionalities. Subscriptions are charged on a recurring basis, either monthly or annually, depending on the plan you choose.

1.1 Non-Refundable Subscriptions
Due to the nature of our digital products and services, all subscription fees are non-refundable. Once a subscription has been paid, it cannot be refunded or prorated, even if the user decides to cancel the subscription before the next billing cycle.

1.2 Subscription Cancellations
You may cancel your subscription at any time before the next billing cycle to avoid being charged for the following period. Cancellations can be made through your account settings. Your access to premium features will continue until the end of the current billing cycle.

2. Event Fees
In certain cases, Xephra may charge a fee to participate in specific gaming events. These fees are non-refundable under any circumstances, including but not limited to:

User's inability to attend the event

Technical issues or malfunctions

User's personal decision to forgo participation

3. Chargebacks
If a user initiates a chargeback through their payment provider, Xephra reserves the right to suspend or ban the user's account immediately. All chargeback claims will be investigated, and we may take legal action if necessary to recover any funds lost due to fraudulent chargebacks.

4. Refund Requests
Refund requests will only be considered under the following circumstances:

Duplicate charges: If you were charged multiple times for the same subscription or event fee, please contact our support team within 07 days to request a refund for the duplicate charge.

Technical Issues: If a user is unable to access their purchased subscription or event due to technical issues caused by Xephra's servers (not user-related), a refund may be issued at the discretion of Xephra's support team.

5. Requesting a Refund
If you believe you are eligible for a refund, please reach out to our support team at. In your request, include the following details:

User account information (username, email)

Proof of purchase (transaction ID, receipt)

Reason for the refund request

We will review your request and respond within 5-7 business days.

6. Changes to the Refund Policy
Xephra reserves the right to modify or update this Refund Policy at any time. Any changes will be posted on this page, and the updated policy will become effective immediately upon posting. We encourage you to review this policy periodically for any updates.

7. Contact Us
If you have any questions about this Refund Policy or need assistance with your subscription or event fees, please contact us at:
Address:Al Ghurair Giga Westria road, Plaza No #34 2nd Floor, DHA phase 2, Islamabad
  Phone Number: +92-300-0692222, +92 339 0018363`,

    service: `Service Policy for Xephra Website

At Xephra, we are dedicated to delivering a high-quality, engaging, and fair gaming experience for all our users. Our service policy outlines the terms and conditions under which our website and services are provided. By accessing or using Xephra, you agree to comply with these terms.

1. Account Registration and User Profiles
Account Creation: To participate in events, access premium content, and interact with other users, you must create a user account. By registering, you agree to provide accurate and up-to-date information.

User Profiles: Your user profile will be visible to other users, showcasing your achievements, ranking, and event participation. It is your responsibility to keep your profile information accurate and to follow the community guidelines.

Account Security: You are responsible for maintaining the confidentiality of your account credentials. Xephra is not liable for any unauthorized access to your account.

2. Event Participation
Joining Events: Users can join events by registering through the website. Participation is subject to event-specific rules, and you are expected to follow all guidelines set forth for each event.

Event Cancellations: Xephra reserves the right to cancel or reschedule events due to technical difficulties, insufficient participation, or other unforeseen circumstances. Users will be notified of event changes, and refunds will be issued where applicable (see our Return Policy).

Event Rules and Cheating: All participants must adhere to the event's rules. Cheating, exploiting bugs, or violating the event's guidelines will result in disqualification and potential account suspension or banning.

3. Ranking and Leaderboards
User Rankings: Users will be ranked based on their performance in events. Rankings are updated periodically and may be adjusted to ensure fairness. Cheating or fraudulent behavior will result in disqualification and possible removal from the leaderboard.

Accuracy of Rankings: While we strive to provide accurate and up-to-date rankings, Xephra cannot guarantee the accuracy of every rank or event result. If you believe there has been an error, please contact our support team.

4. Subscription and Payments
Subscription Plans: Xephra offers subscription plans that grant users access to exclusive content, events, and features. Subscription fees are billed according to the plan selected.

Payment Methods: All payments are processed securely via trusted payment gateways. By subscribing, you agree to the payment terms, including any recurring charges where applicable.

Refunds: Refunds for subscription payments, events, and services are subject to our Return Policy. Please review the policy for more details.

5. Admin and User Interaction
Admin Rights: Admins have full access to user accounts and may suspend or ban users found violating the terms of service, engaging in cheating, or disrupting the gaming environment.

User and Admin Chats: Both users and admins can chat within event groups or directly through private messaging. All communication must adhere to our community guidelines and remain respectful.

Reporting Violations: Users are encouraged to report any rule violations, abusive behavior, or cheating. Admins will investigate reports and take appropriate actions.

6. Content Usage
Intellectual Property: All content provided on Xephra, including images, logos, and event-related materials, are owned by Xephra or its licensors. Users are not permitted to reproduce, distribute, or use this content without permission.

User-Generated Content: By submitting content (e.g., profile pictures, chat messages, etc.) to the website, you grant Xephra a non-exclusive, royalty-free license to use, display, and distribute the content on the platform.

7. Service Availability
Platform Stability: Xephra strives to provide continuous service and maintain the platform's uptime. However, occasional maintenance, updates, or unexpected technical issues may lead to temporary interruptions.

Service Modifications: Xephra reserves the right to modify, update, or discontinue any part of the platform, services, or features without prior notice.

8. Privacy and Data Protection
Personal Information: Xephra respects your privacy and is committed to protecting your personal data. For more details, please review our Privacy Policy.

Data Usage: User data will be used in accordance with the Privacy Policy, and may include tracking user behavior for performance improvements, security purposes, or targeted marketing (with your consent).

9. Terms of Service Agreement
By using Xephra, you agree to abide by this Service Policy, as well as any other terms or guidelines provided. We reserve the right to update this policy at any time, and you will be notified of any changes.`,

    return: `Return Policy for Xephra Website

At Xephra, we strive to provide the best gaming experience for all of our users. We understand that sometimes things don't go as planned, so we've created the following return policy to ensure your satisfaction.

1. Subscription Refunds
30-Day Refund Window: Users can request a refund for any subscription within 30 days of purchase. To request a refund, please contact our support team with your order details.

Eligibility for Refunds: Refunds will only be issued if the user has not participated in any events or consumed any premium features during the subscription period. If a user has used the subscription to join events, access premium features, or rank, the subscription is non-refundable.

2. Event-Related Refunds
Event Cancellation: If an event you registered for is canceled by Xephra, you are eligible for a full refund for the entry fee, if applicable.

No-Show or Disqualification: If you fail to attend an event or are disqualified due to violations of the rules (e.g., cheating), no refunds will be issued.

User Suspensions: If your account is suspended due to cheating or violations of our terms of service, you will forfeit any payments for ongoing or future events.

3. Account Suspensions and Bans
Cheating or Rule Violations: Admins have the authority to suspend or ban users who are caught cheating or violating the rules. In such cases, the user will not receive a refund for any payments made, and the user's profile may be removed or restricted from participating in events.

Cheating in Events: If cheating is detected, the user will be immediately disqualified from events, and the user's account may be flagged or permanently banned. This is in line with our effort to maintain a fair and competitive gaming environment.

4. Payment Issues
If you encounter any issues with payment processing, please contact our support team, and we will assist you in resolving the problem.

Payments for subscriptions, events, and other services are processed through secure payment gateways. Xephra is not responsible for third-party transaction errors.

5. Profile and Ranking
User profiles, rankings, and event participation are subject to Xephra's terms of service. Rankings reflect your performance in events, and these cannot be reset or altered unless there is a verified issue.`,

    terms: `Terms and Conditions

Effective Date: [April 2025]

Welcome to Xephra! Please read the following terms and conditions carefully before using our website and services. By accessing or using our website, you agree to be bound by these terms and conditions. If you do not agree, please do not use the website.

1. Acceptance of Terms
By accessing or using the Xephra website, you agree to comply with and be bound by these Terms and Conditions. These terms may be updated from time to time, and we encourage you to review them periodically.

2. User Account
To participate in events, use our chat feature, and access other services, you must create an account on the Xephra website. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and up-to-date information when creating your account.

3. Events and Rankings
Xephra offers various gaming events where users can participate and be ranked based on their performance. Rankings will be displayed publicly on the website. Users are required to play fairly and follow all event rules. Any attempt to manipulate rankings or cheat in events will result in suspension or termination of the user's account.

4. User Conduct
Users agree to:

Not engage in any form of cheating, hacking, or exploiting bugs in games or events.

Follow the community guidelines, be respectful towards other users, and refrain from using offensive or abusive language.

Not participate in any activity that harms the integrity of the website, other users, or our servers.

Xephra reserves the right to suspend or ban any user who violates these terms.

5. User-Admin Chat
Users can communicate with admins and other participants through the chat system. Admins have the authority to monitor and manage chat content to ensure compliance with the community guidelines. Any inappropriate behavior or violation of these guidelines may result in disciplinary action, including the suspension of your account.

6. Admin Powers
Admins have full access to the information of users participating in events. Admins have the right to suspend or ban users for violations such as cheating, offensive behavior, or any other breach of these Terms and Conditions. Admin actions are final and non-negotiable.

7. Payment and Subscriptions
Xephra offers payment subscriptions for users to access premium features, including exclusive events or additional functionalities. By subscribing, you agree to pay the subscription fees as outlined on our website. Payments will be processed securely, and users are responsible for ensuring that their payment information is up to date.

Subscriptions are non-refundable, and users can cancel their subscription at any time before the next billing cycle.

8. Privacy and Data Collection
Xephra respects your privacy. We collect and process personal data in accordance with our Privacy Policy. By using the website, you consent to the collection and use of your data as outlined in the Privacy Policy.

9. Cheating and Suspension
Users found cheating, exploiting bugs, or engaging in any fraudulent activity will be immediately suspended or banned. The decision to suspend or ban a user is at the sole discretion of Xephra's administrative team.

10. Limitation of Liability
Xephra is not liable for any damages, losses, or expenses arising from your use of the website or participation in any events, including any indirect, incidental, or consequential damages.

11. Indemnification
You agree to indemnify, defend, and hold harmless Xephra, its officers, employees, and agents from any claims, liabilities, damages, or costs arising from your breach of these Terms and Conditions or your use of the website.

12. Changes to Terms
Xephra reserves the right to modify or update these Terms and Conditions at any time. Any changes will be posted on this page, and the updated Terms will become effective immediately upon posting.

13. Contact Us
If you have any questions about these Terms and Conditions, please contact us at:
Address:Al Ghurair Giga Westria road, Plaza No #34 2nd Floor, DHA phase 2, Islamabad
  Phone Number: +92-300-0692222, +92 339 0018363`
  };

  const openPolicy = (policyType) => {
    setActivePolicy(policyType);
  };

  const closePolicy = () => {
    setActivePolicy(null);
  };
  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-purple-900/20 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img 
                src={logo}
                alt="XEPHRA Logo" 
                className="h-12 w-40 mb-3" 
              />
              <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                The ultimate gaming arena where champions are born. Join the competition and prove your skills in the most exciting tournaments.
              </p>
            </div>


            {/* Social Media */}
             <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Twitch className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold font-montserrat text-[#D19F43] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleNavClick && handleNavClick('Home')}
                  className="text-gray-300 hover:text-[#D19F43] transition-colors duration-200 text-sm text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick && handleNavClick('Games')}
                  className="text-gray-300 hover:text-[#D19F43] transition-colors duration-200 text-sm text-left"
                >
                  Games
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick && handleNavClick('Tournaments')}
                  className="text-gray-300 hover:text-[#D19F43] transition-colors duration-200 text-sm text-left"
                >
                  Tournaments
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick && handleNavClick('Prices')}
                  className="text-gray-300 hover:text-[#D19F43] transition-colors duration-200 text-sm text-left"
                >
                  Prices
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-lg font-bold font-montserrat text-[#D19F43] mb-4">Legal & Policies</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => openPolicy('privacy')}
                  className="text-gray-300 hover:text-[#D19F43] transition-colors duration-200 text-sm text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPolicy('refund')}
                  className="text-gray-300 hover:text-[#D19F43] transition-colors duration-200 text-sm text-left"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPolicy('service')}
                  className="text-gray-300 hover:text-[#D19F43] transition-colors duration-200 text-sm text-left"
                >
                  Service Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPolicy('return')}
                  className="text-gray-300 hover:text-[#D19F43] transition-colors duration-200 text-sm text-left"
                >
                  Return Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => openPolicy('terms')}
                  className="text-gray-300 hover:text-[#D19F43] transition-colors duration-200 text-sm text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold font-montserrat text-[#D19F43] mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#D19F43]" />
                <span className="text-gray-300 text-sm">support@xephra.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#D19F43]" />
                <span className="text-gray-300 text-sm">(+92)3000692222</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#D19F43] mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Al Ghurair Giga Westria road,<br /> Plaza No #34 2nd Floor,<br /> DHA phase 2, Islamabad
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 XEPHRA. All rights reserved. Developed with ❤️ for gamers.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-xs">
              <button 
                onClick={() => openPolicy('privacy')}
                className="text-gray-400 hover:text-[#D19F43] transition-colors"
              >
                Privacy
              </button>
              <button 
                onClick={() => openPolicy('terms')}
                className="text-gray-400 hover:text-[#D19F43] transition-colors"
              >
                Terms
              </button>
              <Link to="/login" className="text-gray-400 hover:text-[#D19F43] transition-colors">
                Login
              </Link>
              <Link to="/signup" className="text-gray-400 hover:text-[#D19F43] transition-colors">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Popup Modal */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div className="bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold font-montserrat bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent">
                {activePolicy === 'privacy' && 'Privacy Policy'}
                {activePolicy === 'refund' && 'Refund Policy'}
                {activePolicy === 'service' && 'Service Policy'}
                {activePolicy === 'return' && 'Return Policy'}
                {activePolicy === 'terms' && 'Terms & Conditions'}
              </h2>
              <button
                onClick={closePolicy}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {policyContent[activePolicy]}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-700 bg-gray-800/50">
              <button
                onClick={closePolicy}
                className="px-6 py-2 bg-gradient-to-r from-[#D19F43] to-[#eb9a0d] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;