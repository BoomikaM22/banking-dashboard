A pair of high-performance, modular React components designed for modern banking interfaces. These components feature real-time filtering, state-driven animations, and a responsive "Dark Mode" aesthetic.

This repository contains two primary modules:
Service Search: A "command palette" style search bar for quick access to banking features (e.g., Fund Transfers, Bill Payments).
Global Transaction Intelligence: A robust transaction log with multi-layer filtering (text, amount, type) and sorting capabilities.
1. Service Search Module
Fuzzy Search: Real-time filtering of banking services as the user types.

State-Driven Hover: Interactive item highlighting using onMouseEnter and onMouseLeave.

Dynamic Visuals: Changes border and background colors based on component state (btnHover, hoverIndex).

Conditional Rendering: Results box only appears when a search term is present.

2. Transaction Intelligence Module
Triple-Layer Filtering: * Text Search: Matches descriptions and dates.

Financial Type: Toggle between All, Income, and Expense.

Sorting: Reorder by Latest, Highest Amount, or Lowest Amount.

Visual Indicators: Automatic color coding for financial health (Green for positive balance, Red for negative).

Responsive Flexbox Layout: Controls wrap automatically on mobile screens.
