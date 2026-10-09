# LifeLedger NG — Security & Privacy Architecture

**Standards**: NDPR (Nigeria Data Protection Regulation) Compliant  
**Single Source of Truth**: `prd.md` Section 8 & 9

---

## 1. Threat Model & Mitigations

| Threat | Risk Level | Mitigation Architecture |
| :--- | :--- | :--- |
| **Unauthorized Asset Access** | Critical | Enforced via PostgreSQL Row Level Security (RLS) linked to `household_members`. |
| **Document Leakage** | Critical | Private Supabase Storage buckets. Documents accessed strictly via short-lived signed URLs. |
| **Malicious File Uploads** | High | Client and server MIME-type sniffing, strict allowlist (`PDF`, `JPEG`, `PNG`, `WEBP`), and 10MB file size ceiling. |
| **Forged Payment Callbacks** | High | Paystack webhook cryptographic HMAC SHA-512 signature verification. |
| **Privilege Escalation** | High | Separate administrative user tables (`admin_users`) and tamper-evident audit logging (`audit_logs`). |
| **Technician Snooping** | Medium | Quote requests scrub serial numbers and raw purchase invoices from public technician views. |

---

## 2. File Upload Sanitization Policy (PRD Section 8)

Receipts and warranty cards are central to LifeLedger NG. The following boundary controls are enforced:
1. **Size Ceiling**: Maximum 10MB (`10,485,760` bytes) per object.
2. **Accepted MIME Types**:
   - `image/jpeg` (`.jpg`, `.jpeg`)
   - `image/png` (`.png`)
   - `image/webp` (`.webp`)
   - `application/pdf` (`.pdf`)
3. **Storage Key Obfuscation**: Files are stored with cryptographically random UUID keys (`uuidv4() + ext`) rather than the original client-provided filenames.

---

## 3. Privacy & NDPR Compliance

1. **Right to Access & Data Portability**:
   - Users can trigger a complete export of their household inventory, warranty records, and maintenance logs into NDPR-compliant encrypted JSON or CSV archives.
2. **Right to Erasure (Account Deletion)**:
   - When a household account is deleted, foreign keys cascade safely across private asset records without leaving orphaned receipts in storage.
3. **Customer Document Protection in Marketplace**:
   - When a household requests a quote from a repair professional, the technician receives only the equipment description and symptoms. Serial numbers, purchase receipts, and compound addresses are never disclosed until an official quote is accepted.
