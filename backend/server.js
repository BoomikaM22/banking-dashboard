import express from "express";
import cors from "cors";
import connectDB from "./src/config/database.js";

// Import route modules
import authRoutes from "./src/routes/authRoutes.js";
import accountRoutes from "./src/routes/accountRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import fundTransferRoutes from "./src/routes/fundTransferRoutes.js";
import cardRoutes from "./src/routes/cardRoutes.js";
import billRoutes from "./src/routes/billRoutes.js";
import summaryRoutes from "./src/routes/summaryRoutes.js";
import announcementRoutes from "./src/routes/announcementRoutes.js";
import rechargeRoutes from "./src/routes/rechargeRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// ─── Connect to MongoDB ────────────────────────────────────────────────────────
connectDB();

// ─── Mount route modules ───────────────────────────────────────────────────────
app.use("/api", authRoutes);
app.use("/api", accountRoutes);
app.use("/api", transactionRoutes);
app.use("/api", fundTransferRoutes);
app.use("/api", cardRoutes);
app.use("/api", billRoutes);
app.use("/api", summaryRoutes);
app.use("/api", announcementRoutes);
app.use("/api", rechargeRoutes);

// ─── Seed data (run once) ─────────────────────────────────────────────────────
const seedData = async () => {
  try {
    // Lazy imports to avoid circular dependencies
    const User = (await import("./src/models/User.js")).default;
    const Account = (await import("./src/models/Account.js")).default;
    const Transaction = (await import("./src/models/Transaction.js")).default;
    const Card = (await import("./src/models/Card.js")).default;
    const Bill = (await import("./src/models/Bill.js")).default;
    const Announcement = (await import("./src/models/Announcement.js")).default;

    // Check if data already exists
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log("📦 Database already seeded");
      return;
    }

    console.log("🌱 Seeding database with initial data...");

    // Users
    const user1 = new User({
      id: "u1",
      name: "Arun Kumar",
      email: "arun@example.com",
      password: "password123"
    });
    await user1.save();

    // Accounts
    const acc1 = new Account({
      id: "acc1",
      userId: "u1",
      type: "Savings Account",
      number: "FNVA0001234567",
      balance: 21340,
      createdAt: "2024-01-15"
    });
    await acc1.save();

    const acc2 = new Account({
      id: "acc2",
      userId: "u1",
      type: "Current Account",
      number: "FNVA0007654321",
      balance: 8500,
      createdAt: "2024-03-20"
    });
    await acc2.save();

    // Transactions
    const transactions = [
      { id: "t1", accountId: "acc1", desc: "Salary Credit", amount: 85000, date: "2026-03-01", category: "Income", method: "NEFT" },
      { id: "t2", accountId: "acc1", desc: "Amazon Shopping", amount: -3400, date: "2026-03-03", category: "Shopping", method: "UPI" },
      { id: "t3", accountId: "acc1", desc: "Electricity Bill", amount: -1200, date: "2026-03-05", category: "Bills", method: "UPI" },
      { id: "t4", accountId: "acc1", desc: "Freelance Payment", amount: 12000, date: "2026-03-08", category: "Income", method: "IMPS" },
      { id: "t5", accountId: "acc1", desc: "Petrol Expense", amount: -1500, date: "2026-03-10", category: "Transport", method: "Card" },
      { id: "t6", accountId: "acc1", desc: "Restaurant Dinner", amount: -2200, date: "2026-03-12", category: "Food", method: "UPI" },
      { id: "t7", accountId: "acc1", desc: "Mutual Fund Investment", amount: -5000, date: "2026-03-14", category: "Investment", method: "NEFT" },
      { id: "t8", accountId: "acc1", desc: "Bonus Credit", amount: 20000, date: "2026-03-15", category: "Income", method: "NEFT" },
      { id: "t9", accountId: "acc1", desc: "Netflix Subscription", amount: -649, date: "2026-03-18", category: "Bills", method: "Card" },
      { id: "t10", accountId: "acc1", desc: "Grocery Shopping", amount: -2800, date: "2026-03-20", category: "Shopping", method: "UPI" }
    ];

    for (const tx of transactions) {
      await Transaction.create(tx);
    }

    // Cards
    const card1 = new Card({
      id: "c1",
      userId: "u1",
      type: "Visa Debit",
      number: "**** **** **** 4521",
      expiry: "09/27",
      limit: null,
      color: "#1a1a2e"
    });
    await card1.save();

    const card2 = new Card({
      id: "c2",
      userId: "u1",
      type: "Master Credit",
      number: "**** **** **** 8834",
      expiry: "12/26",
      limit: 200000,
      color: "#16213e"
    });
    await card2.save();

    // Bills
    const bill1 = new Bill({
      id: "b1",
      userId: "u1",
      name: "Electricity",
      provider: "TNEB",
      amount: 1200,
      dueDate: "2026-04-10",
      status: "pending"
    });
    await bill1.save();

    const bill2 = new Bill({
      id: "b2",
      userId: "u1",
      name: "Internet",
      provider: "Jio Fiber",
      amount: 999,
      dueDate: "2026-04-05",
      status: "pending"
    });
    await bill2.save();

    const bill3 = new Bill({
      id: "b3",
      userId: "u1",
      name: "Mobile Recharge",
      provider: "Airtel",
      amount: 599,
      dueDate: "2026-04-08",
      status: "paid"
    });
    await bill3.save();

    const bill4 = new Bill({
      id: "b4",
      userId: "u1",
      name: "Water Bill",
      provider: "CMWSSB",
      amount: 450,
      dueDate: "2026-04-15",
      status: "pending"
    });
    await bill4.save();

    // Announcements
    const announcements = [
      { id: "a1", type: "offer", title: "Zero Processing Fee on Home Loans", body: "Apply before April 30 and get zero processing fee on all home loan applications.", badge: "Limited Offer", date: "2026-03-28" },
      { id: "a2", type: "alert", title: "Scheduled Maintenance – April 5", body: "Internet banking unavailable on April 5 from 2:00 AM to 4:00 AM IST.", badge: "Important", date: "2026-03-27" },
      { id: "a3", type: "reward", title: "Earn 5X Reward Points This Weekend", body: "Use your Finova credit card this weekend and earn 5X reward points on all spends.", badge: "Rewards", date: "2026-03-26" },
      { id: "a4", type: "new", title: "New: UPI Lite for Small Payments", body: "Make UPI payments up to ₹500 without PIN — faster and easier than ever.", badge: "New Feature", date: "2026-03-25" }
    ];

    for (const ann of announcements) {
      await Announcement.create(ann);
    }

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seed error:", error);
  }
};

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`✅  Finova backend running on http://localhost:${PORT}`);
  // Seed data on startup
  await seedData();
});
