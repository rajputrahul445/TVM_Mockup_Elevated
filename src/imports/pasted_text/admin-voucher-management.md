Figma Prompt

Prompt:

Design an enterprise admin dashboard screen titled “Type Code & System Posted Voucher Management.”

The UI should be clean, structured, and optimized for finance or system administrators managing fleet-wide configurations. The layout should follow a step-by-step workflow for creating new type codes or system posted vouchers.

Use a three-step creation workflow with a review and approval stage.

Step 1 — Ship Selection

Create a Ship Selection panel at the top of the screen.

Include:

Multi-select ship list

Search bar for ships

Select All Ships button

Checkbox selection for each ship

Ship list should appear as cards or rows with Ship Name – Code format:

Star Princess – ST
Sun Princess – SU
Discovery Princess – XP
Enchanted Princess – EX
Majestic Princess – MJ
Regal Princess – GP
Royal Princess – RP
Sky Princess – YP
Ruby Princess – RU
Emerald Princess – EP
Crown Princess – KP
Caribbean Princess – CB
Grand Princess – AP
Diamond Princess – DI
Sapphire Princess – SA
Island Princess – IP
Coral Princess – CO

Display a small counter showing number of ships selected.

Example:

“5 Ships Selected”

Step 2 — Configuration Type

After ships are selected, show a Configuration Type Selection panel.

Use two large selectable cards:

Create Type Code

Description:
Used for configuring transaction classification codes used across ships.

Create System Posted Voucher (SPV)

Description:
Used to configure system generated vouchers distributed fleet-wide.

Selecting a card reveals the appropriate configuration form below.

Step 3 — Configuration Form

Design a dynamic form panel with collapsible sections.

Fields should support optional inputs (fields may be left blank).

Sections:

Basic Information

Fields:

Type Code / Voucher Code
Description
Financial Type
Category ID
GL Code (Free Entry Field)

Toggle:

Active / Inactive

Effective Dates

Fields:

Global Effective Start Date
Global Effective End Date

Optional:

Ship-Specific Effective Dates
(Add Ship Override)

Include:

“Add Ship Specific Date” button.

Voucher / Type Code Behavior

Checkbox / Toggle options:

Allow Discounts
Allow Guest Payments
Allow Onboard Credits
Gratuity Applicable
Shore Excursion Transaction
Shore Excursion Sales Category
Show In Account Charges

Include note:

“Fields may remain blank and will inherit default behavior.”

Expiration & Lifecycle

Fields:

Expiration Date
Deactivation Option

Toggle:

Allow Reactivation

Display lifecycle states:

Draft
Pending Approval
Published
Expired
Deactivated

Step 4 — Version Control

Create a Version Control section showing:

Version Number
Last Updated By
Last Updated Date
Change Notes field

Button:

Create New Version

Step 5 — Review & Approval

Design a Review & Submit panel.

Show a summary card with:

Selected Ships
Configuration Type
Effective Dates
Lifecycle Status

Buttons:

Save Draft
Submit For Approval

Approval workflow display:

Creator → Finance Reviewer → System Publisher

Statuses:

Pending Approval
Approved
Declined
Published Fleet-Wide

Additional UI Elements

Include:

Role-Based Access Indicators:

Admin
Finance User (Read Only)
Publisher

Add system note:

“AWS serves as the centralized source of truth for type codes and vouchers distributed to ship databases and Apex.”

Visual Style

Use an enterprise SaaS admin style similar to:

Atlassian / AWS console / enterprise finance systems.

Design characteristics:

Left navigation

Large configuration workspace

Collapsible sections

Step indicators

Clean data tables

Subtle status badges

Colors:

Neutral enterprise palette with blue highlights for actions.

Optional Enhancement

Add a Type Code Library tab with:

Searchable table of all existing type codes

Columns:

Code
Description
Status
Effective Date
Ships Applied
Last Updated