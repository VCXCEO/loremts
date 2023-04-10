// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/customer-chat/{companyName}/{chatId}/{chatToken}" page={CustomerChatPage} name="customerChat" />
      <Private unauthenticated="login">
        <Route path="/chat" page={ChatPage} name="chat" />
        <Route path="/chat/user" page={ChatPage} name="userChat" />
        <Route path="/chat/customer" page={ChatPage} name="internalCustomerChat" />
        <Route path="/chat/user/{chatId:Int}" page={ChatPage} name="userChatWithId" />
        <Route path="/chat/customer/{chatId:Int}" page={ChatPage} name="customerChatWithId" />

        <Route path="/change-password" page={ChangePasswordPage} name="changePassword" />
        <Route path="/dashboard" page={DashboardPage} name="dashboard" />
        <Route path="/home" page={HomePage} name="home" />
        <Set wrap={ScaffoldLayout} title="EscalationNotes" titleTo="escalationNotes" buttonLabel="New EscalationNote" buttonTo="newEscalationNote">
          <Route path="/escalation-notes/new" page={EscalationNoteNewEscalationNotePage} name="newEscalationNote" />
          <Route path="/escalation-notes/{id:Int}/edit" page={EscalationNoteEditEscalationNotePage} name="editEscalationNote" />
          <Route path="/escalation-notes/{id:Int}" page={EscalationNoteEscalationNotePage} name="escalationNote" />
          <Route path="/escalation-notes" page={EscalationNoteEscalationNotesPage} name="escalationNotes" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Escalations" titleTo="escalations" buttonLabel="New Escalation" buttonTo="newEscalation">
          <Route path="/escalations/new" page={EscalationNewEscalationPage} name="newEscalation" />
          <Route path="/escalations/{id:Int}/edit" page={EscalationEditEscalationPage} name="editEscalation" />
          <Route path="/escalations/{id:Int}" page={EscalationEscalationPage} name="escalation" />
          <Route path="/escalations" page={EscalationEscalationsPage} name="escalations" />
        </Set>
        <Set wrap={ScaffoldLayout} title="EmailNotes" titleTo="emailNotes" buttonLabel="New EmailNote" buttonTo="newEmailNote">
          <Route path="/email-notes/new" page={EmailNoteNewEmailNotePage} name="newEmailNote" />
          <Route path="/email-notes/{id:Int}/edit" page={EmailNoteEditEmailNotePage} name="editEmailNote" />
          <Route path="/email-notes/{id:Int}" page={EmailNoteEmailNotePage} name="emailNote" />
          <Route path="/email-notes" page={EmailNoteEmailNotesPage} name="emailNotes" />
        </Set>
        <Set wrap={ScaffoldLayout} title="EmailMessageReceiveds" titleTo="emailMessageReceiveds" buttonLabel="New EmailMessageReceived" buttonTo="newEmailMessageReceived">
          <Route path="/email-message-receiveds/new" page={EmailMessageReceivedNewEmailMessageReceivedPage} name="newEmailMessageReceived" />
          <Route path="/email-message-receiveds/{id:Int}/edit" page={EmailMessageReceivedEditEmailMessageReceivedPage} name="editEmailMessageReceived" />
          <Route path="/email-message-receiveds/{id:Int}" page={EmailMessageReceivedEmailMessageReceivedPage} name="emailMessageReceived" />
          <Route path="/email-message-receiveds" page={EmailMessageReceivedEmailMessageReceivedsPage} name="emailMessageReceiveds" />
        </Set>
        <Set wrap={ScaffoldLayout} title="EmailMessageSents" titleTo="emailMessageSents" buttonLabel="New EmailMessageSent" buttonTo="newEmailMessageSent">
          <Route path="/email-message-sents/new" page={EmailMessageSentNewEmailMessageSentPage} name="newEmailMessageSent" />
          <Route path="/email-message-sents/{id:Int}/edit" page={EmailMessageSentEditEmailMessageSentPage} name="editEmailMessageSent" />
          <Route path="/email-message-sents/{id:Int}" page={EmailMessageSentEmailMessageSentPage} name="emailMessageSent" />
          <Route path="/email-message-sents" page={EmailMessageSentEmailMessageSentsPage} name="emailMessageSents" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Emails" titleTo="emails" buttonLabel="New Email" buttonTo="newEmail">
          <Route path="/emails/new" page={EmailNewEmailPage} name="newEmail" />
          <Route path="/emails/{id:Int}/edit" page={EmailEditEmailPage} name="editEmail" />
          <Route path="/emails/{id:Int}" page={EmailEmailPage} name="email" />
          <Route path="/emails" page={EmailEmailsPage} name="emails" />
        </Set>
        <Set wrap={ScaffoldLayout} title="CustomerToUserChatMessages" titleTo="customerToUserChatMessages" buttonLabel="New CustomerToUserChatMessage" buttonTo="newCustomerToUserChatMessage">
          <Route path="/customer-to-user-chat-messages/new" page={CustomerToUserChatMessageNewCustomerToUserChatMessagePage} name="newCustomerToUserChatMessage" />
          <Route path="/customer-to-user-chat-messages/{id:Int}/edit" page={CustomerToUserChatMessageEditCustomerToUserChatMessagePage} name="editCustomerToUserChatMessage" />
          <Route path="/customer-to-user-chat-messages/{id:Int}" page={CustomerToUserChatMessageCustomerToUserChatMessagePage} name="customerToUserChatMessage" />
          <Route path="/customer-to-user-chat-messages" page={CustomerToUserChatMessageCustomerToUserChatMessagesPage} name="customerToUserChatMessages" />
        </Set>
        <Set wrap={ScaffoldLayout} title="CustomerToUserChatNotes" titleTo="customerToUserChatNotes" buttonLabel="New CustomerToUserChatNote" buttonTo="newCustomerToUserChatNote">
          <Route path="/customer-to-user-chat-notes/new" page={CustomerToUserChatNoteNewCustomerToUserChatNotePage} name="newCustomerToUserChatNote" />
          <Route path="/customer-to-user-chat-notes/{id:Int}/edit" page={CustomerToUserChatNoteEditCustomerToUserChatNotePage} name="editCustomerToUserChatNote" />
          <Route path="/customer-to-user-chat-notes/{id:Int}" page={CustomerToUserChatNoteCustomerToUserChatNotePage} name="customerToUserChatNote" />
          <Route path="/customer-to-user-chat-notes" page={CustomerToUserChatNoteCustomerToUserChatNotesPage} name="customerToUserChatNotes" />
        </Set>
        <Set wrap={ScaffoldLayout} title="CustomerToUserChats" titleTo="customerToUserChats" buttonLabel="New CustomerToUserChat" buttonTo="newCustomerToUserChat">
          <Route path="/customer-to-user-chats/new" page={CustomerToUserChatNewCustomerToUserChatPage} name="newCustomerToUserChat" />
          <Route path="/customer-to-user-chats/{id:Int}/edit" page={CustomerToUserChatEditCustomerToUserChatPage} name="editCustomerToUserChat" />
          <Route path="/customer-to-user-chats/{id:Int}" page={CustomerToUserChatCustomerToUserChatPage} name="customerToUserChat" />
          <Route path="/customer-to-user-chats" page={CustomerToUserChatCustomerToUserChatsPage} name="customerToUserChats" />
        </Set>
        <Set wrap={ScaffoldLayout} title="UserToUserChatMessages" titleTo="userToUserChatMessages" buttonLabel="New UserToUserChatMessage" buttonTo="newUserToUserChatMessage">
          <Route path="/user-to-user-chat-messages/new" page={UserToUserChatMessageNewUserToUserChatMessagePage} name="newUserToUserChatMessage" />
          <Route path="/user-to-user-chat-messages/{id:Int}/edit" page={UserToUserChatMessageEditUserToUserChatMessagePage} name="editUserToUserChatMessage" />
          <Route path="/user-to-user-chat-messages/{id:Int}" page={UserToUserChatMessageUserToUserChatMessagePage} name="userToUserChatMessage" />
          <Route path="/user-to-user-chat-messages" page={UserToUserChatMessageUserToUserChatMessagesPage} name="userToUserChatMessages" />
        </Set>
        <Set wrap={ScaffoldLayout} title="UserToUserChatNotes" titleTo="userToUserChatNotes" buttonLabel="New UserToUserChatNote" buttonTo="newUserToUserChatNote">
          <Route path="/user-to-user-chat-notes/new" page={UserToUserChatNoteNewUserToUserChatNotePage} name="newUserToUserChatNote" />
          <Route path="/user-to-user-chat-notes/{id:Int}/edit" page={UserToUserChatNoteEditUserToUserChatNotePage} name="editUserToUserChatNote" />
          <Route path="/user-to-user-chat-notes/{id:Int}" page={UserToUserChatNoteUserToUserChatNotePage} name="userToUserChatNote" />
          <Route path="/user-to-user-chat-notes" page={UserToUserChatNoteUserToUserChatNotesPage} name="userToUserChatNotes" />
        </Set>
        <Set wrap={ScaffoldLayout} title="UserToUserChats" titleTo="userToUserChats" buttonLabel="New UserToUserChat" buttonTo="newUserToUserChat">
          <Route path="/user-to-user-chats/new" page={UserToUserChatNewUserToUserChatPage} name="newUserToUserChat" />
          <Route path="/user-to-user-chats/{id:Int}/edit" page={UserToUserChatEditUserToUserChatPage} name="editUserToUserChat" />
          <Route path="/user-to-user-chats/{id:Int}" page={UserToUserChatUserToUserChatPage} name="userToUserChat" />
          <Route path="/user-to-user-chats" page={UserToUserChatUserToUserChatsPage} name="userToUserChats" />
        </Set>
        <Set wrap={ScaffoldLayout} title="CallNotes" titleTo="callNotes" buttonLabel="New CallNote" buttonTo="newCallNote">
          <Route path="/call-notes/new" page={CallNoteNewCallNotePage} name="newCallNote" />
          <Route path="/call-notes/{id:Int}/edit" page={CallNoteEditCallNotePage} name="editCallNote" />
          <Route path="/call-notes/{id:Int}" page={CallNoteCallNotePage} name="callNote" />
          <Route path="/call-notes" page={CallNoteCallNotesPage} name="callNotes" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Calls" titleTo="calls" buttonLabel="New Call" buttonTo="newCall">
          <Route path="/calls/new" page={CallNewCallPage} name="newCall" />
          <Route path="/calls/{id:Int}/edit" page={CallEditCallPage} name="editCall" />
          <Route path="/calls/{id:Int}" page={CallCallPage} name="call" />
          <Route path="/calls" page={CallCallsPage} name="calls" />
        </Set>
        <Set wrap={ScaffoldLayout} title="CustomerNotes" titleTo="customerNotes" buttonLabel="New CustomerNote" buttonTo="newCustomerNote">
          <Route path="/customer-notes/new" page={CustomerNoteNewCustomerNotePage} name="newCustomerNote" />
          <Route path="/customer-notes/{id:Int}/edit" page={CustomerNoteEditCustomerNotePage} name="editCustomerNote" />
          <Route path="/customer-notes/{id:Int}" page={CustomerNoteCustomerNotePage} name="customerNote" />
          <Route path="/customer-notes" page={CustomerNoteCustomerNotesPage} name="customerNotes" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Customers" titleTo="customers" buttonLabel="New Customer" buttonTo="newCustomer">
          <Route path="/customers/new" page={CustomerNewCustomerPage} name="newCustomer" />
          <Route path="/customers/{id:Int}/edit" page={CustomerEditCustomerPage} name="editCustomer" />
          <Route path="/customers/{id:Int}" page={CustomerCustomerPage} name="customer" />
          <Route path="/customers" page={CustomerCustomersPage} name="customers" />
        </Set>
        <Set wrap={ScaffoldLayout} title="CompanyBillings" titleTo="companyBillings" buttonLabel="New CompanyBilling" buttonTo="newCompanyBilling">
          <Route path="/company-billings/new" page={CompanyBillingNewCompanyBillingPage} name="newCompanyBilling" />
          <Route path="/company-billings/{id:Int}/edit" page={CompanyBillingEditCompanyBillingPage} name="editCompanyBilling" />
          <Route path="/company-billings/{id:Int}" page={CompanyBillingCompanyBillingPage} name="companyBilling" />
          <Route path="/company-billings" page={CompanyBillingCompanyBillingsPage} name="companyBillings" />
        </Set>
        <Set wrap={ScaffoldLayout} title="CompanyNotes" titleTo="companyNotes" buttonLabel="New CompanyNote" buttonTo="newCompanyNote">
          <Route path="/company-notes/new" page={CompanyNoteNewCompanyNotePage} name="newCompanyNote" />
          <Route path="/company-notes/{id:Int}/edit" page={CompanyNoteEditCompanyNotePage} name="editCompanyNote" />
          <Route path="/company-notes/{id:Int}" page={CompanyNoteCompanyNotePage} name="companyNote" />
          <Route path="/company-notes" page={CompanyNoteCompanyNotesPage} name="companyNotes" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Companies" titleTo="companies" buttonLabel="New Company" buttonTo="newCompany">
          <Route path="/companies/new" page={CompanyNewCompanyPage} name="newCompany" />
          <Route path="/companies/{id:Int}/edit" page={CompanyEditCompanyPage} name="editCompany" />
          <Route path="/companies/{id:Int}" page={CompanyCompanyPage} name="company" />
          <Route path="/companies" page={CompanyCompaniesPage} name="companies" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
          <Route path="/admin/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/admin/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/admin/users/{id:Int}" page={UserUserPage} name="user" />
          <Route path="/admin/users" page={UserUsersPage} name="users" />
        </Set>
      </Private>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
