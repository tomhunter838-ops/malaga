// Málaga move — plan data. One file feeds the tracker (index.html) and the plan page (plan.html).
// Re-issue = replace this file. Threads send deltas (see plan.html → Update) that are merged into it.
window.PLAN = {
 "kind": "malaga-tracker-plan",
 "issued": "2026-09-10T22:00:00Z",
 "issue": "Issue 2 — 10 September 2026, late evening (Stream 1a and Stream 2 handbacks folded in)",
 "arrival": "2027-01-11",
 "tracks": [
  "Spain",
  "Work",
  "Ronnie",
  "Housing",
  "Nursery",
  "Chelsea",
  "Home"
 ],
 "items": [
  {
   "id": "lawyer",
   "track": "Spain",
   "owner": "tom",
   "t": "Send the lawyer re-engagement email (draft in Outlook)",
   "next": "First merge Stream 1a's questions 1.1–1.10 into the draft (60_Stream_1a\\Questions for the Advisers.md). Route, employee-vs-self-employed, evidence months, exit/re-entry, share transfer; answers in writing by 30 Sep",
   "d": "2026-09-10",
   "ls": "2026-09-19",
   "quick": true
  },
  {
   "id": "letters",
   "track": "Home",
   "owner": "tom",
   "t": "Send the three UK letters — lender, insurer, Bolton Council (drafts in Outlook)",
   "next": "Fill in account numbers and your sister's name; overdue since 31 Aug",
   "d": "2026-09-10",
   "ls": "2026-08-31",
   "quick": true
  },
  {
   "id": "s3",
   "track": "Work",
   "owner": "tom",
   "t": "Start the personal-finance thread (Stream 3)",
   "next": "Paste 41_Stream_3_Personal_Finance_Thread_Handoff - Rev B (2026-09-10).md into a new Cowork thread on Fable 5.1; have three months of bank/card exports and the car mileage ready",
   "d": "2026-09-11",
   "quick": true
  },
  {
   "id": "accom",
   "track": "Housing",
   "owner": "both",
   "t": "Start the accommodation thread",
   "next": "Paste 34_Accommodation_Thread_Handoff - Rev B (2026-09-10).md into a new Cowork thread; Chelsea answers its first questions",
   "d": "2026-09-12",
   "quick": true
  },
  {
   "id": "vet1",
   "track": "Ronnie",
   "owner": "tom",
   "t": "Ring or email Queens Park Vets",
   "next": "Chip number, rabies history, book neutering w/c 5 Oct, AHC fee, can the driver sign, ET265 leaflet, kennel cough; then return the AHC questionnaire",
   "d": "2026-09-11",
   "ls": "2026-10-02"
  },
  {
   "id": "taxadv",
   "track": "Work",
   "owner": "tom",
   "t": "Engage the tax adviser (written PE / Beckham / extraction opinion)",
   "next": "Ask whether the 30 Sep board pack can be split; question list from Stream 1a",
   "d": "2026-09-14",
   "ls": "2026-08-31"
  },
  {
   "id": "greentree",
   "track": "Nursery",
   "owner": "chelsea",
   "t": "Message Green Tree — place from mid/late January",
   "next": "Do earlier months need paying, how much, when; staggered settling-in; sign up as soon as they say yes",
   "d": "2026-09-11"
  },
  {
   "id": "temporada",
   "track": "Housing",
   "owner": "chelsea",
   "t": "Temporada enquiries to eastern-Málaga operators",
   "next": "In Spanish, dog declared, mid-Jan to mid-Apr, furnished, bedroom air-con",
   "d": "2026-09-12",
   "ls": "2026-10-15"
  },
  {
   "id": "payslips",
   "track": "Work",
   "owner": "tom",
   "t": "Service agreement check + instruct the payroll agent on a fixed GROSS for Oct–Dec",
   "next": "Payslips are read — the income test is passed. By 18 Sep: is there a written service agreement with a start date? By 30 Sep: decide the rest-of-year gross in the September run and tell EV LLP: fixed gross, net in one transfer on the payslip date, no salary sacrifice Oct–Dec",
   "d": "2026-09-14",
   "ls": "2026-09-30"
  },
  {
   "id": "bankcert",
   "track": "Work",
   "owner": "tom",
   "t": "Ask the bank what salary certificate it issues, and its lead time",
   "next": "It must cover Oct–Dec and agree with the payslips; order it once December's pay has landed",
   "d": "2026-09-21",
   "ls": "2026-10-15",
   "quick": true
  },
  {
   "id": "acropage",
   "track": "Spain",
   "owner": "tom",
   "t": "Read the ACRO police-certificate page in a normal browser",
   "next": "Record fee, turnaround, address-history rule, validity — Claude can do it in the browser pane",
   "d": "2026-09-14",
   "ls": "2026-10-12"
  },
  {
   "id": "contract",
   "track": "Chelsea",
   "owner": "chelsea",
   "t": "Read the Chase de Vere contract; decide 4, 6 or 8 weeks' notice",
   "next": "Minimum notice, pay-date alignment, holiday owed. 8 wks → 13 Nov · 6 → 27 Nov · 4 → 11 Dec (last day Fri 8 Jan)",
   "d": "2026-09-12",
   "ls": "2026-12-11",
   "quick": true
  },
  {
   "id": "chip",
   "track": "Ronnie",
   "owner": "tom",
   "t": "Confirm the microchip database shows Tom or Chelsea as keeper",
   "next": "Transfer if it's the breeder or the grandparents",
   "d": "2026-09-18",
   "ls": "2026-10-02"
  },
  {
   "id": "ferry",
   "track": "Ronnie",
   "owner": "tom",
   "t": "Ring Brittany Ferries, then book Portsmouth → Santander, car + pet cabin",
   "next": "0330 159 7000: pet cabins per ship, dog toileting on 33 h, foot-passenger pets, 2027 sailing days. Amendable ticket",
   "d": "2026-09-18",
   "ls": "2026-10-30"
  },
  {
   "id": "crate",
   "track": "Ronnie",
   "owner": "both",
   "t": "Start Ronnie's crate and car habituation",
   "next": "Short and positive, before the operation",
   "d": "2026-09-21"
  },
  {
   "id": "apostilleA",
   "track": "Spain",
   "owner": "tom",
   "t": "Lodge apostille batch A — the GRO copy of the 2023 marriage certificate + Oliver's original birth certificate",
   "next": "Standard paper route (£45 each); the marriage-cert copy arrives ~16 Sep (priority GRO order). Back ~26 Oct, sworn translations early Nov",
   "d": "2026-09-21",
   "ls": "2026-12-03"
  },
  {
   "id": "grandp",
   "track": "Ronnie",
   "owner": "tom",
   "t": "Grandparents confirm they can hold Ronnie ~6–29 Jan",
   "next": "If not, book a paid boarder now",
   "d": "2026-09-25"
  },
  {
   "id": "classif",
   "track": "Work",
   "owner": "adviser",
   "t": "Employee vs self-employed settled in writing by the lawyer",
   "next": "Evidence pack is built as an employee pack by default; payroll is fixed by the September instruction — change nothing in Oct–Dec",
   "d": "2026-09-30",
   "ls": "2026-10-15"
  },
  {
   "id": "board",
   "track": "Work",
   "owner": "tom",
   "t": "Board Minute A — sign (drafted; no tax opinion needed)",
   "next": "Continued directorship, remote working, employer letter (John signs), service agreement, salary unchanged Oct–Dec, conditional authority for the social-security application and any share transfer; members' resolution Tom/John/Mark. Minute B (dividend, relocation policy) w/c 9 Nov",
   "d": "2026-09-30",
   "ls": "2026-11-09"
  },
  {
   "id": "neuter",
   "track": "Ronnie",
   "owner": "tom",
   "t": "Ronnie neutered",
   "next": "Confirm the real recovery period with the practice",
   "d": "2026-10-05",
   "ls": "2026-10-12"
  },
  {
   "id": "schengen",
   "track": "Spain",
   "owner": "both",
   "t": "Last pre-move Schengen trip (family guardrail)",
   "next": "Days in Schengen before 11 Jan count towards the 90",
   "d": "2026-10-12",
   "ls": "2026-10-12"
  },
  {
   "id": "flights",
   "track": "Home",
   "owner": "tom",
   "t": "Book flights MAN → AGP one-way ~Mon 11 Jan",
   "next": "Jet2 first choice (infant free, hold bags); once the lawyer confirms the route",
   "d": "2026-10-14",
   "ls": "2026-12-04"
  },
  {
   "id": "tempcontract",
   "track": "Housing",
   "owner": "both",
   "t": "Temporada contract signed (or refundable Airbnb fallback by 1 Nov)",
   "next": "Video viewing, pet clause in writing, landlord's DNI copy, fibre test",
   "d": "2026-10-15",
   "ls": "2026-11-01"
  },
  {
   "id": "payslip1",
   "track": "Work",
   "owner": "tom",
   "t": "First qualifying payslip — October, at the fixed gross",
   "next": "Same gross as set in September, net in ONE transfer on the payslip date, payslip + bank statement matching; Oct/Nov/Dec are the evidence months — change nothing after",
   "d": "2026-10-15",
   "ls": "2026-10-15",
   "hard": true
  },
  {
   "id": "ovbook",
   "track": "Ronnie",
   "owner": "tom",
   "t": "Book Ronnie's January vet (AHC) appointment for Tue 26 Jan",
   "next": "January slots are scarce",
   "d": "2026-10-16",
   "ls": "2026-12-04"
  },
  {
   "id": "hmrc",
   "track": "Work",
   "owner": "adviser",
   "t": "HMRC's / accountant's ruling on the UK social-security route",
   "next": "CA3822 vs CA8421 — get the ruling, don't file on an assumption",
   "d": "2026-10-26"
  },
  {
   "id": "acro",
   "track": "Spain",
   "owner": "both",
   "t": "Order ACRO police certificates, Tom and Chelsea",
   "next": "Chelsea as CARR and HUNTER, full address history; Claude builds the worksheet first. Brought forward from 26 Oct so batch B is back before Christmas",
   "d": "2026-10-12",
   "ls": "2026-11-12",
   "hard": true
  },
  {
   "id": "apostAback",
   "track": "Spain",
   "owner": "tom",
   "t": "Batch A back from the FCDO → sworn translations",
   "next": "Two translation quotes; 1–2 working days per document",
   "d": "2026-10-26"
  },
  {
   "id": "ladder",
   "track": "Ronnie",
   "owner": "both",
   "t": "Separation-tolerance ladder begins in earnest",
   "next": "",
   "d": "2026-10-26"
  },
  {
   "id": "driver",
   "track": "Ronnie",
   "owner": "tom",
   "t": "Name the driver (= authorised person) and lock the sailing",
   "next": "Or accept the courier fallback and its commercial paperwork",
   "d": "2026-10-30",
   "ls": "2026-10-30"
  },
  {
   "id": "tgss",
   "track": "Work",
   "owner": "tom",
   "t": "Prana's Spanish social-security registration under way (or the A1 route filed)",
   "next": "The UGE-CE wants evidence of the company's registration at filing",
   "d": "2026-10-31",
   "ls": "2026-10-31"
  },
  {
   "id": "rabies",
   "track": "Ronnie",
   "owner": "tom",
   "t": "Ronnie's rabies vaccination",
   "next": "Family guardrail 30 Nov; absolute last-safe Mon 11 Jan 2027. Booster expiry into the calendar with a 90-day warning",
   "d": "2026-11-02",
   "ls": "2027-01-11",
   "hard": true
  },
  {
   "id": "notice8",
   "track": "Chelsea",
   "owner": "chelsea",
   "t": "Hand in notice at Chase de Vere (if 8 weeks)",
   "next": "6 weeks = 27 Nov, 4 weeks = 11 Dec, for a Fri 8 Jan last day",
   "d": "2026-11-13",
   "ls": "2026-12-11"
  },
  {
   "id": "acroin",
   "track": "Spain",
   "owner": "tom",
   "t": "ACRO certificates in hand",
   "next": "Assumption: ~15 working days",
   "d": "2026-11-02"
  },
  {
   "id": "boarder1",
   "track": "Ronnie",
   "owner": "both",
   "t": "First paid UK home-boarder trial (one night)",
   "next": "",
   "d": "2026-11-16"
  },
  {
   "id": "apostille",
   "track": "Spain",
   "owner": "tom",
   "t": "Lodge apostille batch B — both ACRO certificates",
   "next": "Paper route; ACRO can't be e-apostilled; 25 working days. Back ~11 Dec, before the Christmas dead week. No recovery past 3 Dec",
   "d": "2026-11-06",
   "ls": "2026-12-03",
   "hard": true
  },
  {
   "id": "nursery",
   "track": "Nursery",
   "owner": "chelsea",
   "t": "Give Oliver's Bolton nursery six weeks' notice (last day Fri 8 Jan)",
   "next": "Check month alignment in the contract",
   "d": "2026-11-20",
   "ls": "2026-11-27"
  },
  {
   "id": "dryrun",
   "track": "Ronnie",
   "owner": "both",
   "t": "Grandparents' dry run — a full week",
   "next": "Without the family visiting",
   "d": "2026-11-30"
  },
  {
   "id": "dvla",
   "track": "Chelsea",
   "owner": "chelsea",
   "t": "Apply to the DVLA for Chelsea's full UK driving licence while she still has a UK address",
   "next": "Never applied after passing; route, fee and turnaround still to verify on gov.uk; also check the UK–Spain exchange rules",
   "d": "2026-10-01",
   "ls": "2026-12-01"
  },
  {
   "id": "ghic",
   "track": "Home",
   "owner": "chelsea",
   "t": "GHIC applications for Tom, Chelsea and Oliver",
   "next": "While still UK-resident; free; ~15 working days",
   "d": "2026-12-01"
  },
  {
   "id": "health",
   "track": "Spain",
   "owner": "tom",
   "t": "Buy the Spanish health policy — cover from 11 Jan",
   "next": "No copays, no waiting periods, not travel/reimbursement-only",
   "d": "2026-12-05"
  },
  {
   "id": "boarder2",
   "track": "Ronnie",
   "owner": "both",
   "t": "Second boarder trial (three nights) + a 3-hour motorway run",
   "next": "",
   "d": "2026-12-07"
  },
  {
   "id": "exit",
   "track": "Home",
   "owner": "chelsea",
   "t": "UK exit block",
   "next": "Royal Mail overseas redirection (real quote), council tax, utilities to sister, GP records + Oliver's immunisation printout + repeat prescriptions before deregistering, banks",
   "d": "2026-12-15"
  },
  {
   "id": "dividend",
   "track": "Work",
   "owner": "tom",
   "t": "Pre-departure dividend paid; third qualifying payslip",
   "next": "Sized by the accountant, declared in Minute B (w/c 9 Nov); members' resolution already annexed to Minute A",
   "d": "2026-12-31",
   "ls": "2026-12-31",
   "hard": true
  },
  {
   "id": "ronniegp",
   "track": "Ronnie",
   "owner": "tom",
   "t": "Ronnie moves in with the grandparents",
   "next": "Before the packing week",
   "d": "2027-01-06",
   "ls": "2027-01-09"
  },
  {
   "id": "apostback",
   "track": "Spain",
   "owner": "tom",
   "t": "Batch B back from the FCDO → sworn translations",
   "next": "",
   "d": "2026-12-11"
  },
  {
   "id": "lastdays",
   "track": "Home",
   "owner": "both",
   "t": "Chelsea's last day at work; Oliver's last nursery day",
   "next": "",
   "d": "2027-01-08"
  },
  {
   "id": "handover",
   "track": "Home",
   "owner": "both",
   "t": "Bolton handover to Tom's sister — keys, meters, house file",
   "next": "",
   "d": "2027-01-10"
  },
  {
   "id": "fly",
   "track": "Home",
   "owner": "both",
   "t": "Fly MAN → AGP. Arrive Málaga.",
   "next": "EES biometrics at the border; day 90 = 10 Apr 2027",
   "d": "2027-01-11",
   "hard": true
  },
  {
   "id": "padron",
   "track": "Spain",
   "owner": "chelsea",
   "t": "Padrón (town-hall register) appointment",
   "next": "On the passport; tenancy contract + landlord's DNI copy",
   "d": "2027-01-12"
  },
  {
   "id": "translations",
   "track": "Spain",
   "owner": "tom",
   "t": "Sworn translations complete (batch A early Nov, batch B mid-Dec)",
   "next": "Whole Spanish pack ready for the ~19 Jan filing",
   "d": "2026-12-18"
  },
  {
   "id": "settle",
   "track": "Nursery",
   "owner": "chelsea",
   "t": "Green Tree settling-in begins",
   "next": "Staggered if they agree",
   "d": "2027-01-12"
  },
  {
   "id": "file",
   "track": "Spain",
   "owner": "tom",
   "t": "File at the UGE-CE",
   "next": "Filing extends legal stay while it's decided",
   "d": "2027-01-19"
  },
  {
   "id": "tomuk",
   "track": "Ronnie",
   "owner": "tom",
   "t": "Tom flies to the UK for Ronnie's AHC (only after the lawyer's exit answer)",
   "next": "",
   "d": "2027-01-25"
  },
  {
   "id": "ahc",
   "track": "Ronnie",
   "owner": "tom",
   "t": "Ronnie's AHC appointment, Bolton (window 22 Jan – 1 Feb)",
   "next": "Tom or the authorised driver signs; written authorisation attached",
   "d": "2027-01-26",
   "hard": true
  },
  {
   "id": "drive",
   "track": "Ronnie",
   "owner": "driver",
   "t": "Driver → Portsmouth; Tom flies back to Málaga",
   "next": "Owner movement inside five days of the dog's",
   "d": "2027-01-29"
  },
  {
   "id": "sail",
   "track": "Ronnie",
   "owner": "driver",
   "t": "Sail Portsmouth → Santander (pet cabin)",
   "next": "2027 sailing days still to verify",
   "d": "2027-01-30"
  },
  {
   "id": "entry",
   "track": "Ronnie",
   "owner": "driver",
   "t": "EU entry check at Santander → drive to Málaga",
   "next": "~950 km, one overnight (estimate)",
   "d": "2027-02-01"
  },
  {
   "id": "vetes",
   "track": "Ronnie",
   "owner": "both",
   "t": "First Spanish vet: leishmaniasis first, EU pet passport, RAIA, liability insurance",
   "next": "Processionary caterpillars: lead only under pines Feb–Apr",
   "d": "2027-02-15"
  },
  {
   "id": "resolution",
   "track": "Spain",
   "owner": "tom",
   "t": "UGE-CE decision expected → TIE fingerprints",
   "next": "",
   "d": "2027-02-16"
  },
  {
   "id": "day90",
   "track": "Spain",
   "owner": "both",
   "t": "Day 90 of the visitor stay",
   "next": "If nothing is pending, the family must leave Schengen",
   "d": "2027-04-10",
   "hard": true
  }
 ],
 "streams": [
  {
   "id": "s1",
   "name": "Stream 1 — The move",
   "thread": "Hunters Move To Malaga 2026 (the original thread)",
   "owner": "Tom + Chelsea",
   "scope": "Visa route and lawyer, earnings evidence, housing, nursery, flights, apostilles and translations, Ronnie, the UK exit, the family briefing and this tracker",
   "from": "file 31 (Rev B)",
   "writes": "50_Live_Plan\\",
   "reads": [
    "40_Current_2026-09\\ (baseline)",
    "60_Stream_1a\\Position for Stream 1.md",
    "root file 39 (Stream 2 handback)",
    "Accommodation\\ (when it exists)"
   ],
   "status": "live",
   "tracks": [
    "Spain",
    "Ronnie",
    "Housing",
    "Nursery",
    "Chelsea",
    "Home"
   ],
   "gates": [
    "payslip1",
    "acro",
    "apostille",
    "dividend",
    "fly",
    "ahc",
    "day90"
   ],
   "rules": [
    "Never edit 40_Current_2026-09\\ — supersede with dated files",
    "Irish track stays out beyond one line",
    "Nothing is sent, paid or submitted by the thread"
   ]
  },
  {
   "id": "s1a",
   "name": "Stream 1a — Prana",
   "thread": "New thread from file 38",
   "owner": "Tom",
   "scope": "The company side: salary and payslips, the board, share transfer, tax and Spanish social security",
   "from": "file 38",
   "writes": "60_Stream_1a\\",
   "reads": [
    "Xero, payslips, service agreement",
    "Companies House"
   ],
   "status": "done 10 Sep (re-open on new questions)",
   "tracks": [
    "Work"
   ],
   "gates": [
    "payslip1",
    "dividend"
   ],
   "rules": [
    "Everything gross and net, £ and €",
    "Share transfer is an option only",
    "No Prana branch if it endangers the visa"
   ]
  },
  {
   "id": "s2",
   "name": "Stream 2 — Ireland",
   "thread": "New thread from file 37",
   "owner": "Tom",
   "scope": "Chelsea’s Irish citizenship (Foreign Birth Registration), her Irish passport in late 2027, then the family’s EU-family switch. Kept out of the move plan on purpose.",
   "from": "file 37",
   "writes": "25_FBR_Evidence\\ · 40_Current_2026-09\\Ireland - FBR\\ · Correspondence\\",
   "reads": [
    "Stage 1 review",
    "GRO and DFA pages"
   ],
   "status": "live (lower priority)",
   "tracks": [],
   "gates": [],
   "rules": [
    "We are going without it",
    "Two dates cross back to Stream 1: pack posted; passport arrives"
   ]
  },
  {
   "id": "s3",
   "name": "Stream 3 — Personal finance",
   "thread": "New thread from file 41 (Rev B)",
   "owner": "Tom",
   "scope": "Family money: the move budget, cost tracking, savings, the UK house",
   "from": "file 41 (Rev B)",
   "writes": "70_Stream_3\\ (not yet created)",
   "reads": [
    "Bank and card exports",
    "file 39 §3 cost table (seed)"
   ],
   "status": "not started",
   "tracks": [],
   "gates": [
    "dividend"
   ],
   "rules": [
    "Anecdotal like-for-like costs, not generic percentages",
    "Costs in from every stream; budget out"
   ]
  },
  {
   "id": "accom",
   "name": "Accommodation",
   "thread": "New thread from file 34 (Rev B)",
   "owner": "Chelsea + Tom",
   "scope": "Finding and contracting the Málaga flat: temporada enquiries, viewing plan, the January landing pad",
   "from": "file 34 (Rev B)",
   "writes": "Accommodation\\ (not yet created)",
   "reads": [
    "July research",
    "Stream 1 status"
   ],
   "status": "not started",
   "tracks": [
    "Housing"
   ],
   "gates": [],
   "rules": [
    "Hands the contract back to Stream 1",
    "Reconciles the three rent ranges in week one"
   ]
  },
  {
   "id": "review",
   "name": "Review thread",
   "thread": "From file 30 — closed 10 Sep 2026",
   "owner": "—",
   "scope": "Built the verified baseline everything now stands on",
   "from": "file 30",
   "writes": "40_Current_2026-09\\",
   "reads": [],
   "status": "closed",
   "tracks": [],
   "gates": [],
   "rules": []
  }
 ],
 "crossovers": [
  {
   "from": "s1a",
   "to": "s1",
   "label": "60_Stream_1a\\Position for Stream 1.md — the earnings position for the visa",
   "short": "earnings position"
  },
  {
   "from": "s2",
   "to": "s1",
   "label": "root file 39 handback; the marriage certificate: original to Dublin, GRO copy to Spain",
   "short": "file 39 · marriage cert"
  },
  {
   "from": "s3",
   "to": "s1",
   "label": "costs in, budget out",
   "short": "costs in · budget out",
   "both": true
  },
  {
   "from": "s3",
   "to": "s1a",
   "label": "costs in, budget out",
   "short": "costs in · budget out",
   "both": true
  },
  {
   "from": "accom",
   "to": "s1",
   "label": "the flat contract",
   "short": "the flat contract"
  }
 ],
 "history": []
};
