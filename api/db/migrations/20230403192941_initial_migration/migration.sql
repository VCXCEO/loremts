-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "roles" TEXT[] DEFAULT ARRAY['user']::TEXT[],
    "profilePicture" TEXT,
    "firstLogin" BOOLEAN NOT NULL DEFAULT true,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "companyId" INTEGER,
    "companyName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "companyLogo" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "chatIdentifier" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyNote" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CompanyNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyBilling" (
    "id" SERIAL NOT NULL,
    "billingPeriodStart" TIMESTAMP(3) NOT NULL,
    "billingPeriodEnd" TIMESTAMP(3) NOT NULL,
    "billingAmount" INTEGER NOT NULL,
    "renewalDate" TIMESTAMP(3) NOT NULL,
    "renewalFrequency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "CompanyBilling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "transactionId" TEXT[],
    "internalSatisfactionRating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerNote" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CustomerNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Call" (
    "id" SERIAL NOT NULL,
    "callDirection" TEXT NOT NULL,
    "callDuration" INTEGER NOT NULL,
    "record" TEXT NOT NULL,
    "dateReceived" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "satisfactionRating" INTEGER,
    "internalSatisfactionRating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallNote" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "callId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CallNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToUserChat" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER,
    "companyName" TEXT,

    CONSTRAINT "UserToUserChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToUserChatNote" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userToUserChatId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserToUserChatNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToUserChatMessage" (
    "id" SERIAL NOT NULL,
    "messageText" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userToUserChatId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "UserToUserChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerToUserChat" (
    "id" SERIAL NOT NULL,
    "tags" TEXT[],
    "satisfactionRating" INTEGER,
    "internalSatisfactionRating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyChatIdentifier" TEXT NOT NULL,

    CONSTRAINT "CustomerToUserChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerToUserChatNote" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerToUserChatId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CustomerToUserChatNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerToUserChatMessage" (
    "id" SERIAL NOT NULL,
    "messageText" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerToUserChatId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "CustomerToUserChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "conversationId" TEXT NOT NULL,
    "inbox" TEXT NOT NULL,
    "handleTime" INTEGER NOT NULL,
    "dateReceived" TIMESTAMP(3) NOT NULL,
    "subject" TEXT NOT NULL,
    "tags" TEXT[],
    "satisfactionRating" INTEGER,
    "internalSatisfactionRating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailMessageSent" (
    "id" SERIAL NOT NULL,
    "messageId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "extract" TEXT NOT NULL,
    "handleTime" INTEGER NOT NULL,
    "dateReceived" TIMESTAMP(3) NOT NULL,
    "emailId" INTEGER NOT NULL,
    "emailConversationId" TEXT NOT NULL,

    CONSTRAINT "EmailMessageSent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailMessageReceived" (
    "id" SERIAL NOT NULL,
    "messageId" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "extract" TEXT NOT NULL,
    "handleTime" INTEGER NOT NULL,
    "dateReceived" TIMESTAMP(3) NOT NULL,
    "emailId" INTEGER,
    "emailConversationId" TEXT,

    CONSTRAINT "EmailMessageReceived_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailNote" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emailId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EmailNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escalation" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "record" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER,
    "customerEmail" TEXT,
    "customerPhone" TEXT,
    "companyId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,

    CONSTRAINT "Escalation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscalationNote" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "escalationId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EscalationNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToUserToUserChat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CompanyToCustomer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CustomerToUserChatToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_domain_key" ON "Company"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "Company_chatIdentifier_key" ON "Company"("chatIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "Company_id_name_key" ON "Company"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_id_name_chatIdentifier_key" ON "Company"("id", "name", "chatIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_email_phone_key" ON "Customer"("id", "email", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_phone_key" ON "Customer"("id", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_email_key" ON "Customer"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Call_id_record_key" ON "Call"("id", "record");

-- CreateIndex
CREATE UNIQUE INDEX "Email_conversationId_key" ON "Email"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "Email_id_conversationId_key" ON "Email"("id", "conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailMessageSent_messageId_key" ON "EmailMessageSent"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailMessageReceived_messageId_key" ON "EmailMessageReceived"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "Escalation_id_record_key" ON "Escalation"("id", "record");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUserToUserChat_AB_unique" ON "_UserToUserToUserChat"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUserToUserChat_B_index" ON "_UserToUserToUserChat"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToCustomer_AB_unique" ON "_CompanyToCustomer"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToCustomer_B_index" ON "_CompanyToCustomer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToUserChatToUser_AB_unique" ON "_CustomerToUserChatToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToUserChatToUser_B_index" ON "_CustomerToUserChatToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_companyName_fkey" FOREIGN KEY ("companyId", "companyName") REFERENCES "Company"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyNote" ADD CONSTRAINT "CompanyNote_companyId_companyName_fkey" FOREIGN KEY ("companyId", "companyName") REFERENCES "Company"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyNote" ADD CONSTRAINT "CompanyNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyBilling" ADD CONSTRAINT "CompanyBilling_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerNote" ADD CONSTRAINT "CustomerNote_customerId_customerEmail_customerPhone_fkey" FOREIGN KEY ("customerId", "customerEmail", "customerPhone") REFERENCES "Customer"("id", "email", "phone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerNote" ADD CONSTRAINT "CustomerNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_customerId_customerPhone_fkey" FOREIGN KEY ("customerId", "customerPhone") REFERENCES "Customer"("id", "phone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_companyId_companyName_fkey" FOREIGN KEY ("companyId", "companyName") REFERENCES "Company"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallNote" ADD CONSTRAINT "CallNote_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallNote" ADD CONSTRAINT "CallNote_customerId_customerPhone_fkey" FOREIGN KEY ("customerId", "customerPhone") REFERENCES "Customer"("id", "phone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallNote" ADD CONSTRAINT "CallNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToUserChat" ADD CONSTRAINT "UserToUserChat_companyId_companyName_fkey" FOREIGN KEY ("companyId", "companyName") REFERENCES "Company"("id", "name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToUserChatNote" ADD CONSTRAINT "UserToUserChatNote_userToUserChatId_fkey" FOREIGN KEY ("userToUserChatId") REFERENCES "UserToUserChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToUserChatNote" ADD CONSTRAINT "UserToUserChatNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToUserChatMessage" ADD CONSTRAINT "UserToUserChatMessage_userToUserChatId_fkey" FOREIGN KEY ("userToUserChatId") REFERENCES "UserToUserChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToUserChatMessage" ADD CONSTRAINT "UserToUserChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToUserChat" ADD CONSTRAINT "CustomerToUserChat_customerId_customerEmail_fkey" FOREIGN KEY ("customerId", "customerEmail") REFERENCES "Customer"("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToUserChat" ADD CONSTRAINT "CustomerToUserChat_companyId_companyName_companyChatIdenti_fkey" FOREIGN KEY ("companyId", "companyName", "companyChatIdentifier") REFERENCES "Company"("id", "name", "chatIdentifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToUserChatNote" ADD CONSTRAINT "CustomerToUserChatNote_customerToUserChatId_fkey" FOREIGN KEY ("customerToUserChatId") REFERENCES "CustomerToUserChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToUserChatNote" ADD CONSTRAINT "CustomerToUserChatNote_customerId_customerEmail_fkey" FOREIGN KEY ("customerId", "customerEmail") REFERENCES "Customer"("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToUserChatNote" ADD CONSTRAINT "CustomerToUserChatNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToUserChatMessage" ADD CONSTRAINT "CustomerToUserChatMessage_customerToUserChatId_fkey" FOREIGN KEY ("customerToUserChatId") REFERENCES "CustomerToUserChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerToUserChatMessage" ADD CONSTRAINT "CustomerToUserChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_customerId_customerEmail_fkey" FOREIGN KEY ("customerId", "customerEmail") REFERENCES "Customer"("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_companyId_companyName_fkey" FOREIGN KEY ("companyId", "companyName") REFERENCES "Company"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailMessageSent" ADD CONSTRAINT "EmailMessageSent_emailId_emailConversationId_fkey" FOREIGN KEY ("emailId", "emailConversationId") REFERENCES "Email"("id", "conversationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailMessageReceived" ADD CONSTRAINT "EmailMessageReceived_emailId_emailConversationId_fkey" FOREIGN KEY ("emailId", "emailConversationId") REFERENCES "Email"("id", "conversationId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailNote" ADD CONSTRAINT "EmailNote_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Email"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailNote" ADD CONSTRAINT "EmailNote_customerId_customerEmail_fkey" FOREIGN KEY ("customerId", "customerEmail") REFERENCES "Customer"("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailNote" ADD CONSTRAINT "EmailNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escalation" ADD CONSTRAINT "Escalation_customerId_customerEmail_customerPhone_fkey" FOREIGN KEY ("customerId", "customerEmail", "customerPhone") REFERENCES "Customer"("id", "email", "phone") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escalation" ADD CONSTRAINT "Escalation_companyId_companyName_fkey" FOREIGN KEY ("companyId", "companyName") REFERENCES "Company"("id", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscalationNote" ADD CONSTRAINT "EscalationNote_escalationId_fkey" FOREIGN KEY ("escalationId") REFERENCES "Escalation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EscalationNote" ADD CONSTRAINT "EscalationNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUserToUserChat" ADD CONSTRAINT "_UserToUserToUserChat_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUserToUserChat" ADD CONSTRAINT "_UserToUserToUserChat_B_fkey" FOREIGN KEY ("B") REFERENCES "UserToUserChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToCustomer" ADD CONSTRAINT "_CompanyToCustomer_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToCustomer" ADD CONSTRAINT "_CompanyToCustomer_B_fkey" FOREIGN KEY ("B") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToUserChatToUser" ADD CONSTRAINT "_CustomerToUserChatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CustomerToUserChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToUserChatToUser" ADD CONSTRAINT "_CustomerToUserChatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
