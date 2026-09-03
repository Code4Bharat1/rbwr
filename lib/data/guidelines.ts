import { Guideline } from "@/lib/types";

export const guidelines: Guideline[] = [
  {
    id: "gl-mass-formation",
    categoryId: "cat-mass-formation",
    version: "2.4",
    issuedDate: "2025-06-01",
    sections: {
      definition:
        "A Mass Human Formation record recognizes the largest verified group of participants who simultaneously assemble into a pre-defined shape, symbol, or pattern within a bounded venue.",
      eligibility:
        "Open to Rotary clubs, districts, civic organizations, and independent applicants. A minimum of 500 participants is required to qualify for World-category consideration.",
      measurementMethod:
        "Participant count is established via synchronized aerial photography/drone survey cross-referenced against a ground-level manual headcount and digital check-in wristband scans.",
      equipment:
        "Certified drone or elevated camera rig, ground-marking grid, wristband or badge check-in system, calibrated stopwatch, public address system for coordinated timing cues.",
      timingRules:
        "The formation must hold its final shape, motionless, for a minimum of 5 continuous minutes as confirmed by adjudicator timing.",
      participantRules:
        "Each participant must be individually checked in, be at least 8 years of age unless otherwise waived, and occupy a single marked position for the full holding period.",
      countingMethod:
        "Final count is the lower of (a) verified check-in scans and (b) independent aerial/manual count reconciliation, rounded down to the nearest whole participant.",
      safety:
        "A certified safety officer and medical team must be on-site. Maximum venue density may not exceed local fire-safety occupancy limits.",
      witnessRequirements:
        "Minimum of 5 independent witnesses not affiliated with the organizing club, including at least one civic official.",
      photographyRequirements:
        "Full-formation aerial photography at 3 intervals during the holding period, plus perimeter ground photography documenting check-in.",
      videoRequirements:
        "Continuous, uncut aerial video coverage of the entire holding period, timestamped and synchronized with ground audio cues.",
      adjudicatorRequirements:
        "Minimum of one RBWR-certified Regional Adjudicator on-site; International-level formations require a Chief Adjudicator.",
    },
  },
  {
    id: "gl-community-impact",
    categoryId: "cat-community-impact",
    version: "1.8",
    issuedDate: "2025-02-14",
    sections: {
      definition:
        "A Community Impact record recognizes the largest verified scale of a coordinated community service action completed within a defined time window.",
      eligibility:
        "Open to Rotary clubs, districts, NGOs, and corporate community-responsibility programs. Impact must be independently attributable and measurable.",
      measurementMethod:
        "Impact is measured using the applicant's declared primary metric (e.g., volunteers, trees planted, units distributed), cross-verified against partner-organization logs.",
      equipment:
        "GPS-tagged logging devices or mobile check-in application, partner-site sign-in sheets, tally/inventory systems appropriate to the activity.",
      timingRules:
        "All counted activity must occur within a single continuous 24-hour window unless the guideline explicitly permits a multi-day rolling attempt.",
      participantRules:
        "All participating volunteers or sites must be pre-registered with the RBWR-issued tracking system prior to the attempt start time.",
      countingMethod:
        "Aggregate totals are reconciled across all partner sites by the adjudicator of record; discrepancies greater than 3% between logged and witnessed counts require re-verification.",
      safety:
        "Site-specific risk assessments are required for each partner location; a lead safety coordinator must be designated for multi-site attempts.",
      witnessRequirements:
        "At least one independent witness per partner site, plus a lead witness with visibility across the full coordinated effort.",
      photographyRequirements:
        "Time-stamped photographic documentation from each partner site at the start, midpoint, and conclusion of the attempt window.",
      videoRequirements:
        "Summary video coverage from at least 3 representative sites, plus any available live-stream archive.",
      adjudicatorRequirements:
        "Minimum of one RBWR-certified adjudicator overseeing the lead site, with designated on-site verification officers at secondary sites.",
    },
  },
  {
    id: "gl-corporate",
    categoryId: "cat-corporate-team",
    version: "1.3",
    issuedDate: "2025-01-20",
    sections: {
      definition:
        "A Corporate Team Achievement record recognizes the largest or fastest verified achievement completed by employees of a single organization or corporate group.",
      eligibility:
        "Open to any registered corporate entity. Participation must be limited to current employees, contractors, or officially affiliated personnel.",
      measurementMethod:
        "Aggregated data is sourced from an approved digital system (e.g., wearable device export, badge-scan log, internal application telemetry) and independently audited.",
      equipment:
        "Approved data-export platform, employee badge or wristband check-in system, calibrated measurement devices relevant to the activity.",
      timingRules:
        "The measurement window is fixed at the time of application and may not be extended once the attempt has begun.",
      participantRules:
        "Only verified current personnel of the applicant organization may be counted toward the total.",
      countingMethod:
        "Final totals are calculated from the audited data export, with a 5% sample manually cross-checked against source device logs.",
      safety:
        "Standard workplace health and safety protocols apply; any physical-exertion activity requires a designated on-site first-aid provision.",
      witnessRequirements:
        "Minimum of 2 independent witnesses, at least one of whom must be external to the applicant organization (e.g., auditor, RBWR representative).",
      photographyRequirements:
        "Photographic documentation of the primary venue and, where applicable, a representative sample of remote/secondary sites.",
      videoRequirements:
        "Video summary of the attempt window, including screen-capture or dashboard footage of the live aggregate total where relevant.",
      adjudicatorRequirements:
        "At least one RBWR-certified adjudicator to review the audited data export and sign the final report.",
    },
  },
  {
    id: "gl-fundraising",
    categoryId: "cat-club-fundraising",
    version: "1.1",
    issuedDate: "2024-09-05",
    sections: {
      definition:
        "A Club Fundraising Achievement record recognizes the largest verified sum raised by a single Rotary club during one fundraising event.",
      eligibility:
        "Open to chartered Rotary clubs in good standing. Funds must be raised through a single, dated event (gala, auction, campaign day).",
      measurementMethod:
        "Total raised is calculated from audited event financial statements, reconciled against payment-processor and bank deposit records.",
      equipment:
        "Certified point-of-sale or donation-platform system, event ledger, independent accountant sign-off.",
      timingRules:
        "All pledges and payments must be received and settled within 30 days of the event date to be counted toward the final total.",
      participantRules:
        "Not applicable in the traditional sense; donor identity need not be disclosed, but aggregate transaction counts must be auditable.",
      countingMethod:
        "Gross funds raised, less documented event costs, as certified by an independent chartered accountant.",
      safety:
        "Standard event safety and venue capacity regulations apply.",
      witnessRequirements:
        "Independent chartered accountant sign-off plus at least one RBWR-designated financial reviewer.",
      photographyRequirements:
        "Event photography documenting attendance and key fundraising moments (auction, pledge drive, matching-gift announcement).",
      videoRequirements:
        "Optional; recommended for live-auction or pledge-drive moments used as verification evidence.",
      adjudicatorRequirements:
        "RBWR reviewer with financial-verification training must sign off in addition to the on-site adjudicator.",
    },
  },
  {
    id: "gl-endurance",
    categoryId: "cat-endurance",
    version: "2.0",
    issuedDate: "2025-03-18",
    sections: {
      definition:
        "An Endurance & Physical Feats record recognizes the longest continuous, verified duration or distance of sustained physical activity by an individual or team.",
      eligibility:
        "Open to individuals or teams aged 16+. Medical clearance is required for attempts exceeding 12 continuous hours.",
      measurementMethod:
        "Distance and/or duration is tracked via certified GPS device and cross-checked against continuous video coverage and adjudicator log sheets.",
      equipment:
        "Certified GPS tracker, continuous video recording equipment, medical monitoring station, rest-break timer.",
      timingRules:
        "Permitted rest breaks (if any) must be pre-declared in the guidelines and are deducted from the total qualifying duration.",
      participantRules:
        "For team/relay attempts, only registered team members may participate; substitutions must be logged in real time.",
      countingMethod:
        "Final duration/distance is the adjudicator-verified total after deducting any non-compliant breaks or gaps in continuous coverage.",
      safety:
        "On-site medical personnel are mandatory for attempts exceeding 6 continuous hours; hydration and rest protocols must be documented.",
      witnessRequirements:
        "Minimum of 3 witnesses across the full duration, in rotating shifts for multi-hour attempts.",
      photographyRequirements:
        "Photographic log at minimum hourly intervals throughout the attempt.",
      videoRequirements:
        "Continuous, uncut video coverage for the full duration is mandatory with no gaps exceeding 60 seconds.",
      adjudicatorRequirements:
        "At least one RBWR-certified adjudicator must be present at all times; shift handovers must be logged.",
    },
  },
  {
    id: "gl-rotary-service",
    categoryId: "cat-rotary-service",
    version: "1.5",
    issuedDate: "2024-11-22",
    sections: {
      definition:
        "A Rotary Service Project Scale record recognizes the largest single-day, multi-project service initiative coordinated by one or more Rotary clubs.",
      eligibility:
        "Open to chartered Rotary clubs and districts. Projects must be coordinated under a single named initiative with shared reporting.",
      measurementMethod:
        "Scale is measured using the declared primary metric (value delivered, beneficiaries served, units distributed) reconciled across all participating project sites.",
      equipment:
        "Site-level tally sheets or check-in application, partner-agency reporting logs, independent valuation methodology where applicable.",
      timingRules:
        "All project activity must occur within the single declared calendar day across all participating time zones, if applicable.",
      participantRules:
        "Rotarians, Rotaractors, and registered community volunteers may all be counted; roles must be logged by project site.",
      countingMethod:
        "Aggregate totals are reconciled by the lead reviewer across all site reports, with spot-verification of at least 20% of sites.",
      safety:
        "Each project site must designate a safety lead; high-risk activities require a dedicated risk assessment on file.",
      witnessRequirements:
        "At least one independent witness per project site, plus a district-level coordinating witness.",
      photographyRequirements:
        "Photographic documentation from each project site with timestamp and geotag where possible.",
      videoRequirements:
        "Summary video compiling coverage from a representative sample of project sites.",
      adjudicatorRequirements:
        "Lead RBWR-certified adjudicator overseeing the coordinating site, with verification officers at secondary sites.",
    },
  },
  {
    id: "gl-tech-innovation",
    categoryId: "cat-tech-innovation",
    version: "1.2",
    issuedDate: "2025-09-01",
    sections: {
      definition:
        "A Technology & Innovation Feat record recognizes a verified breakthrough in speed, scale, or precision achieved through a technological system or process.",
      eligibility:
        "Open to corporations, research institutions, and independent technologists. The system under test must be disclosed and reproducible for audit purposes.",
      measurementMethod:
        "Performance is measured via instrumented sensor/telemetry data logged continuously across the verification window and independently audited by the adjudicator.",
      equipment:
        "Calibrated sensor/telemetry logging system, independent timing reference, redundant data capture for audit purposes.",
      timingRules:
        "The verification window is fixed in advance and must demonstrate sustained (not peak/instantaneous) performance across its full duration.",
      participantRules:
        "Not applicable to personnel in most cases; where human-in-the-loop operation is involved, operator identities must be logged.",
      countingMethod:
        "Final performance figure is the sustained average across the full verification window, as reconciled from the audited telemetry export.",
      safety:
        "Standard industrial/laboratory safety protocols apply; automated systems must include a certified emergency-stop procedure.",
      witnessRequirements:
        "Minimum of 2 independent witnesses with relevant technical expertise, plus the RBWR adjudicator of record.",
      photographyRequirements:
        "Photographic documentation of the system setup, instrumentation, and operating environment.",
      videoRequirements:
        "Continuous video coverage of the full verification window, synchronized with the telemetry timestamp.",
      adjudicatorRequirements:
        "RBWR-certified adjudicator with technology-verification specialization must review raw telemetry prior to sign-off.",
    },
  },
];

export function getGuideline(id?: string) {
  return guidelines.find((g) => g.id === id);
}
export function getGuidelineByCategory(categoryId: string) {
  return guidelines.find((g) => g.categoryId === categoryId);
}
