import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getFormspreeId, hasFormspreeConfig } from "@/lib/forms";
import { usePageMeta } from "@/hooks/usePageMeta";
import AnimatedSection from "@/components/AnimatedSection";

type YN = boolean | null;
type FormStatus = "idle" | "submitting" | "success" | "error";

// ─── Reusable UI primitives ────────────────────────────────────────────────

const YesNo = ({ value, onChange }: { value: YN; onChange: (v: boolean) => void }) => (
  <div className="flex gap-1.5 shrink-0">
    <button
      type="button"
      onClick={() => onChange(true)}
      className={`px-3 py-1 text-xs font-display tracking-wider uppercase rounded border transition-colors duration-200 ${
        value === true
          ? "bg-primary/20 text-primary border-primary/50"
          : "border-border/40 text-muted-foreground hover:border-primary/40"
      }`}
    >
      Yes
    </button>
    <button
      type="button"
      onClick={() => onChange(false)}
      className={`px-3 py-1 text-xs font-display tracking-wider uppercase rounded border transition-colors duration-200 ${
        value === false
          ? "bg-red-400/10 text-red-400 border-red-400/40"
          : "border-border/40 text-muted-foreground hover:border-red-400/30"
      }`}
    >
      No
    </button>
  </div>
);

const SectionHeader = ({ num, title }: { num: string; title: string }) => (
  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border/30">
    <span className="font-display text-xs tracking-[0.2em] text-primary">{num}</span>
    <h2 className="font-display text-sm tracking-wider uppercase">{title}</h2>
  </div>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-3 border-b border-border/15 last:border-0 min-h-[46px]">
    <span className="text-sm font-light text-foreground leading-snug">{label}</span>
    {children}
  </div>
);

const selectCls =
  "h-9 rounded border border-border/40 bg-background/50 px-2 text-xs font-light text-foreground focus:outline-none focus:border-primary/40 transition-colors min-w-[185px]";

const inputCls = "bg-background/50 border-border/40 focus:border-primary/40";

const AUTHORITY = [
  "ZIFA Headquarters",
  "Regional Administrator",
  "Competition Manager",
  "Match Commissioner",
  "Referee",
  "Club",
  "Other",
];

const RESPONSIBLE = [
  "Referee",
  "Match Commissioner",
  "Club Administrator",
  "Competition Manager",
  "ZIFA Headquarters",
  "Other",
];

// ─── Component ────────────────────────────────────────────────────────────

const Zifa = () => {
  usePageMeta({
    title: "ZIFA Requirements | MathBrooks",
    description: "ZIFA Football Management System — Information & Requirements Form",
    canonicalPath: "/zifa",
  });

  const formspreeConfigured = hasFormspreeConfig();
  const [status, setStatus] = useState<FormStatus>("idle");

  // Contact
  const [cName, setCName] = useState("");
  const [cTitle, setCTitle] = useState("");
  const [cEmail, setCEmail] = useState("");

  // §2 — Approving authority
  const [approving, setA] = useState({
    playerRegistration: "",
    localTransfers: "",
    internationalTransfers: "",
    clubRegistration: "",
    competitionEntry: "",
    matchResultSubmission: "",
    matchReportApproval: "",
  });

  // §3 — Admin structure
  const [totalRegions, setTotalRegions] = useState("");
  const [totalZones, setTotalZones] = useState("");
  const [regionsIndependent, setRegionsIndependent] = useState<YN>(null);
  const [zonesAuthority, setZonesAuthority] = useState<YN>(null);
  const [adminCorrections, setAdminCorrections] = useState("");

  // §4 — User roles
  const [roles, setRoles] = useState({
    zifaSuperAdmin: null as YN,
    zifaCompetitionManager: null as YN,
    regionalAdmin: null as YN,
    areaZoneAdmin: null as YN,
    clubAdmin: null as YN,
    referee: null as YN,
    matchCommissioner: null as YN,
    technicalAnalyst: null as YN,
  });
  const [additionalRoles, setAdditionalRoles] = useState("");

  // §5 — Player docs
  const [playerDocs, setPlayerDocs] = useState({
    nationalId: false,
    photograph: false,
    proofOfAge: false,
    clubConfirmation: false,
  });
  const [playerDocsOther, setPlayerDocsOther] = useState("");

  // §6 — Identity verification
  const [verif, setVerif] = useState({
    nationalId: null as YN,
    photograph: null as YN,
    duplicateDetection: null as YN,
  });
  const [verifOther, setVerifOther] = useState("");

  // §7 — Competition management
  const [fixtureEntry, setFixtureEntry] = useState("");
  const [matchResp, setMatchResp] = useState({
    scoreline: "",
    yellowCards: "",
    redCards: "",
    lineup: "",
    matchReport: "",
  });

  // §8 — Match data fields
  const [matchData, setMatchData] = useState({
    teamLineups: null as YN,
    substitutions: null as YN,
    goals: null as YN,
    yellowCards: null as YN,
    redCards: null as YN,
    matchOfficials: null as YN,
    venue: null as YN,
    kitInfo: null as YN,
  });
  const [matchDataNotes, setMatchDataNotes] = useState("");

  // §9 — Coach records
  const [coach, setCoach] = useState({
    qualifications: null as YN,
    licenses: null as YN,
    previousTeams: null as YN,
    performanceHistory: null as YN,
  });

  // §10 — Youth & grassroots
  const [youth, setYouth] = useState({
    schoolsRegister: false, schoolsCompetitions: false, schoolsRecords: false,
    academiesRegister: false, academiesCompetitions: false, academiesRecords: false,
    youthLeaguesRegister: false, youthLeaguesCompetitions: false, youthLeaguesRecords: false,
    grassrootsRegister: false, grassrootsCompetitions: false, grassrootsRecords: false,
  });

  // §11 — Gender
  const [gender, setGender] = useState({
    youthMale: false, youthFemale: false,
    regionalMale: false, regionalFemale: false,
    professionalMale: false, professionalFemale: false,
    futsalMale: false, futsalFemale: false,
  });

  // §12 — FIFA
  const [fifaId, setFifaId] = useState("");
  const [fifaSync, setFifaSync] = useState<YN>(null);
  const [fifaNotes, setFifaNotes] = useState("");

  // Additional notes
  const [notes, setNotes] = useState("");

  // ── helpers ──
  const yn = (v: YN) => (v === null ? "—" : v ? "Yes" : "No");
  const cb = (v: boolean) => (v ? "Yes" : "No");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName.trim() || !cEmail.trim()) return;
    if (!formspreeConfigured) { setStatus("error"); return; }
    setStatus("submitting");

    const payload = {
      _subject: "ZIFA Requirements Form — MathBrooks",
      // Contact
      "Respondent Name": cName,
      "Respondent Title": cTitle,
      "Respondent Email": cEmail,
      // §2
      "Approving: Player Registration": approving.playerRegistration,
      "Approving: Local Transfers": approving.localTransfers,
      "Approving: International Transfers": approving.internationalTransfers,
      "Approving: Club Registration": approving.clubRegistration,
      "Approving: Competition Entry": approving.competitionEntry,
      "Approving: Match Result Submission": approving.matchResultSubmission,
      "Approving: Match Report Approval": approving.matchReportApproval,
      // §3
      "Total Regions / Provinces": totalRegions,
      "Total Area Zones": totalZones,
      "Regions Manage Competitions Independently": yn(regionsIndependent),
      "Area Zones Hold Administrative Authority": yn(zonesAuthority),
      "Admin Structure Corrections": adminCorrections,
      // §4
      "Role: ZIFA Super Administrator": yn(roles.zifaSuperAdmin),
      "Role: ZIFA Competition Manager": yn(roles.zifaCompetitionManager),
      "Role: Regional Administrator": yn(roles.regionalAdmin),
      "Role: Area Zone Administrator": yn(roles.areaZoneAdmin),
      "Role: Club Administrator": yn(roles.clubAdmin),
      "Role: Referee": yn(roles.referee),
      "Role: Match Commissioner": yn(roles.matchCommissioner),
      "Role: Technical Study Group Analyst": yn(roles.technicalAnalyst),
      "Additional Roles": additionalRoles,
      // §5
      "Player Doc: National ID": cb(playerDocs.nationalId),
      "Player Doc: Photograph": cb(playerDocs.photograph),
      "Player Doc: Proof of Age": cb(playerDocs.proofOfAge),
      "Player Doc: Club Confirmation": cb(playerDocs.clubConfirmation),
      "Player Doc: Other": playerDocsOther,
      // §6
      "Verify: National ID": yn(verif.nationalId),
      "Verify: Photograph": yn(verif.photograph),
      "Verify: Duplicate Detection": yn(verif.duplicateDetection),
      "Verify: Other": verifOther,
      // §7
      "Fixture Entry Responsibility": fixtureEntry,
      "Match Responsible: Scoreline": matchResp.scoreline,
      "Match Responsible: Yellow Cards": matchResp.yellowCards,
      "Match Responsible: Red Cards": matchResp.redCards,
      "Match Responsible: Lineup": matchResp.lineup,
      "Match Responsible: Match Report": matchResp.matchReport,
      // §8
      "Match Data: Team Lineups": yn(matchData.teamLineups),
      "Match Data: Substitutions": yn(matchData.substitutions),
      "Match Data: Goals": yn(matchData.goals),
      "Match Data: Yellow Cards": yn(matchData.yellowCards),
      "Match Data: Red Cards": yn(matchData.redCards),
      "Match Data: Match Officials": yn(matchData.matchOfficials),
      "Match Data: Venue": yn(matchData.venue),
      "Match Data: Kit Info": yn(matchData.kitInfo),
      "Match Data Notes": matchDataNotes,
      // §9
      "Coach: Qualifications": yn(coach.qualifications),
      "Coach: Licenses": yn(coach.licenses),
      "Coach: Previous Teams": yn(coach.previousTeams),
      "Coach: Performance History": yn(coach.performanceHistory),
      // §10
      "Youth — Schools: Register Players": cb(youth.schoolsRegister),
      "Youth — Schools: Enter Competitions": cb(youth.schoolsCompetitions),
      "Youth — Schools: Maintain Records": cb(youth.schoolsRecords),
      "Youth — Academies: Register Players": cb(youth.academiesRegister),
      "Youth — Academies: Enter Competitions": cb(youth.academiesCompetitions),
      "Youth — Academies: Maintain Records": cb(youth.academiesRecords),
      "Youth — Youth Leagues: Register Players": cb(youth.youthLeaguesRegister),
      "Youth — Youth Leagues: Enter Competitions": cb(youth.youthLeaguesCompetitions),
      "Youth — Youth Leagues: Maintain Records": cb(youth.youthLeaguesRecords),
      "Youth — Grassroots: Register Players": cb(youth.grassrootsRegister),
      "Youth — Grassroots: Enter Competitions": cb(youth.grassrootsCompetitions),
      "Youth — Grassroots: Maintain Records": cb(youth.grassrootsRecords),
      // §11
      "Gender — Youth Leagues: Male": cb(gender.youthMale),
      "Gender — Youth Leagues: Female": cb(gender.youthFemale),
      "Gender — Regional Leagues: Male": cb(gender.regionalMale),
      "Gender — Regional Leagues: Female": cb(gender.regionalFemale),
      "Gender — Professional Leagues: Male": cb(gender.professionalMale),
      "Gender — Professional Leagues: Female": cb(gender.professionalFemale),
      "Gender — Futsal: Male": cb(gender.futsalMale),
      "Gender — Futsal: Female": cb(gender.futsalFemale),
      // §12
      "FIFA Connect Identifier": fifaId,
      "FIFA Sync with zim_uat.ma.services": yn(fifaSync),
      "FIFA Compliance Notes": fifaNotes,
      // misc
      "Additional Notes": notes,
    };

    try {
      const res = await fetch(`https://formspree.io/f/${getFormspreeId()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <AnimatedSection>
          <div className="card-glass rounded-lg p-10 max-w-md w-full text-center space-y-6">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
            <div className="space-y-2">
              <h2 className="font-display text-base tracking-wider uppercase">Submitted</h2>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Thank you. The MathBrooks development team will review your responses
                and follow up shortly.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  const isValid = cName.trim().length > 0 && cEmail.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">

        <AnimatedSection>
          <div className="mb-10">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
              ZIFA × MathBrooks
            </p>
            <h1 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-wide leading-tight mb-3">
              Football Management System
            </h1>
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-xl">
              Requirements & information request. Complete all sections and submit —
              this gives the development team everything needed to configure the system
              to ZIFA's operational requirements.
            </p>
          </div>
        </AnimatedSection>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Contact ── */}
          <AnimatedSection delay={60}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="—" title="Your Details" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="c-name" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                    Name <span className="text-red-400">*</span>
                  </Label>
                  <Input id="c-name" value={cName} onChange={(e) => setCName(e.target.value)} placeholder="Full name" required className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-title" className="text-xs font-display tracking-wider uppercase text-muted-foreground">Title / Role</Label>
                  <Input id="c-title" value={cTitle} onChange={(e) => setCTitle(e.target.value)} placeholder="e.g. General Secretary" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-email" className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input id="c-email" type="email" value={cEmail} onChange={(e) => setCEmail(e.target.value)} placeholder="you@zifa.co.zw" required className={inputCls} />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── §2 Approving Authority ── */}
          <AnimatedSection delay={80}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="02" title="Governance — Approving Authority" />
              <p className="text-xs font-light text-muted-foreground mb-5">
                For each action, select which authority is responsible for approval.
              </p>
              {(
                [
                  ["playerRegistration", "Player registration"],
                  ["localTransfers", "Local player transfers"],
                  ["internationalTransfers", "International transfers"],
                  ["clubRegistration", "Club registration"],
                  ["competitionEntry", "Competition entry"],
                  ["matchResultSubmission", "Match result submission"],
                  ["matchReportApproval", "Match report approval"],
                ] as [keyof typeof approving, string][]
              ).map(([key, label]) => (
                <Row key={key} label={label}>
                  <select
                    value={approving[key]}
                    onChange={(e) => setA((p) => ({ ...p, [key]: e.target.value }))}
                    className={selectCls}
                  >
                    <option value="">Select…</option>
                    {AUTHORITY.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Row>
              ))}
            </div>
          </AnimatedSection>

          {/* ── §3 Admin Structure ── */}
          <AnimatedSection delay={100}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="03" title="National Administrative Structure" />
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="space-y-1.5">
                  <Label className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                    Total Regions / Provinces
                  </Label>
                  <Input type="number" min="0" value={totalRegions} onChange={(e) => setTotalRegions(e.target.value)} placeholder="e.g. 10" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                    Total Area Zones
                  </Label>
                  <Input type="number" min="0" value={totalZones} onChange={(e) => setTotalZones(e.target.value)} placeholder="e.g. 42" className={inputCls} />
                </div>
              </div>
              <Row label="Regions manage competitions independently">
                <YesNo value={regionsIndependent} onChange={setRegionsIndependent} />
              </Row>
              <Row label="Area zones hold administrative authority">
                <YesNo value={zonesAuthority} onChange={setZonesAuthority} />
              </Row>
              <div className="mt-4 space-y-1.5">
                <Label className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                  Corrections to hierarchy (if any)
                </Label>
                <Input value={adminCorrections} onChange={(e) => setAdminCorrections(e.target.value)} placeholder="e.g. Rename 'Area Zone' to 'District'" className={inputCls} />
              </div>
            </div>
          </AnimatedSection>

          {/* ── §4 User Roles ── */}
          <AnimatedSection delay={120}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="04" title="User Roles & Access Levels" />
              <p className="text-xs font-light text-muted-foreground mb-5">
                Confirm which roles should exist in the system.
              </p>
              {(
                [
                  ["zifaSuperAdmin", "ZIFA Super Administrator", "Full national system access"],
                  ["zifaCompetitionManager", "ZIFA Competition Manager", "Manage competitions and fixtures"],
                  ["regionalAdmin", "Regional Administrator", "Manage regional competitions"],
                  ["areaZoneAdmin", "Area Zone Administrator", "Manage local football activities"],
                  ["clubAdmin", "Club Administrator", "Manage club registrations and players"],
                  ["referee", "Referee", "Submit match reports"],
                  ["matchCommissioner", "Match Commissioner", "Verify match information"],
                  ["technicalAnalyst", "Technical Study Group Analyst", "Performance and scouting analysis"],
                ] as [keyof typeof roles, string, string][]
              ).map(([key, label, desc]) => (
                <div key={key} className="flex items-center justify-between gap-4 py-3 border-b border-border/15 last:border-0">
                  <div>
                    <p className="text-sm font-light text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground font-light">{desc}</p>
                  </div>
                  <YesNo value={roles[key]} onChange={(v) => setRoles((p) => ({ ...p, [key]: v }))} />
                </div>
              ))}
              <div className="mt-4 space-y-1.5">
                <Label className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                  Additional roles needed
                </Label>
                <Input value={additionalRoles} onChange={(e) => setAdditionalRoles(e.target.value)} placeholder="e.g. Medical Officer, Media Officer…" className={inputCls} />
              </div>
            </div>
          </AnimatedSection>

          {/* ── §5 Player Docs ── */}
          <AnimatedSection delay={140}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="05" title="Player Registration — Required Documents" />
              <p className="text-xs font-light text-muted-foreground mb-5">
                Select all documents required when registering a player.
              </p>
              <div className="space-y-3">
                {(
                  [
                    ["nationalId", "National ID / Passport"],
                    ["photograph", "Player photograph"],
                    ["proofOfAge", "Proof of age"],
                    ["clubConfirmation", "Club confirmation letter"],
                  ] as [keyof typeof playerDocs, string][]
                ).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={playerDocs[key]}
                      onChange={(e) => setPlayerDocs((p) => ({ ...p, [key]: e.target.checked }))}
                      className="w-4 h-4 rounded border-border/40 accent-primary cursor-pointer"
                    />
                    <span className="text-sm font-light text-foreground group-hover:text-primary transition-colors">{label}</span>
                  </label>
                ))}
                <div className="space-y-1.5 pt-1">
                  <Label className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                    Other documents
                  </Label>
                  <Input value={playerDocsOther} onChange={(e) => setPlayerDocsOther(e.target.value)} placeholder="Any additional required documents…" className={inputCls} />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── §6 Identity Verification ── */}
          <AnimatedSection delay={160}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="06" title="Player Identity Verification" />
              <p className="text-xs font-light text-muted-foreground mb-5">
                Confirm which verification methods are required.
              </p>
              <Row label="National ID number — mandatory check">
                <YesNo value={verif.nationalId} onChange={(v) => setVerif((p) => ({ ...p, nationalId: v }))} />
              </Row>
              <Row label="Player photograph verification">
                <YesNo value={verif.photograph} onChange={(v) => setVerif((p) => ({ ...p, photograph: v }))} />
              </Row>
              <Row label="Duplicate player detection">
                <YesNo value={verif.duplicateDetection} onChange={(v) => setVerif((p) => ({ ...p, duplicateDetection: v }))} />
              </Row>
              <div className="mt-4 space-y-1.5">
                <Label className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                  Other verification methods
                </Label>
                <Input value={verifOther} onChange={(e) => setVerifOther(e.target.value)} placeholder="e.g. Biometric check…" className={inputCls} />
              </div>
            </div>
          </AnimatedSection>

          {/* ── §7 Competition Management ── */}
          <AnimatedSection delay={180}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="07" title="Competition Management" />
              <div className="mb-6 space-y-2">
                <Label className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                  Who enters fixtures into the system?
                </Label>
                <div className="flex gap-2 flex-wrap pt-1">
                  {["ZIFA Centrally", "Competition Managers", "Both"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFixtureEntry(opt)}
                      className={`px-3 py-1.5 text-xs font-display tracking-wider uppercase rounded border transition-colors duration-200 ${
                        fixtureEntry === opt
                          ? "bg-primary/20 text-primary border-primary/50"
                          : "border-border/40 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs font-display tracking-wider uppercase text-muted-foreground mb-2">
                Who submits each match data item?
              </p>
              {(
                [
                  ["scoreline", "Match scoreline"],
                  ["yellowCards", "Yellow cards"],
                  ["redCards", "Red cards"],
                  ["lineup", "Player participation / lineup"],
                  ["matchReport", "Match report"],
                ] as [keyof typeof matchResp, string][]
              ).map(([key, label]) => (
                <Row key={key} label={label}>
                  <select
                    value={matchResp[key]}
                    onChange={(e) => setMatchResp((p) => ({ ...p, [key]: e.target.value }))}
                    className={selectCls}
                  >
                    <option value="">Select…</option>
                    {RESPONSIBLE.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </Row>
              ))}
            </div>
          </AnimatedSection>

          {/* ── §8 Match Data Fields ── */}
          <AnimatedSection delay={200}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="08" title="Match Data Fields" />
              <p className="text-xs font-light text-muted-foreground mb-5">
                Should the system capture each of the following?
              </p>
              {(
                [
                  ["teamLineups", "Team lineups"],
                  ["substitutions", "Substitutions"],
                  ["goals", "Goals scored"],
                  ["yellowCards", "Yellow cards"],
                  ["redCards", "Red cards"],
                  ["matchOfficials", "Match officials"],
                  ["venue", "Stadium / venue information"],
                  ["kitInfo", "Kit information (home / away / alternative)"],
                ] as [keyof typeof matchData, string][]
              ).map(([key, label]) => (
                <Row key={key} label={label}>
                  <YesNo value={matchData[key]} onChange={(v) => setMatchData((p) => ({ ...p, [key]: v }))} />
                </Row>
              ))}
              <div className="mt-4 space-y-1.5">
                <Label className="text-xs font-display tracking-wider uppercase text-muted-foreground">Notes</Label>
                <Input value={matchDataNotes} onChange={(e) => setMatchDataNotes(e.target.value)} placeholder="Any additional match data requirements…" className={inputCls} />
              </div>
            </div>
          </AnimatedSection>

          {/* ── §9 Coach Records ── */}
          <AnimatedSection delay={220}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="09" title="Coach & Staff Records" />
              <p className="text-xs font-light text-muted-foreground mb-5">
                Should the system maintain historical records for the following?
              </p>
              <Row label="Coaching qualifications">
                <YesNo value={coach.qualifications} onChange={(v) => setCoach((p) => ({ ...p, qualifications: v }))} />
              </Row>
              <Row label="Coaching licenses">
                <YesNo value={coach.licenses} onChange={(v) => setCoach((p) => ({ ...p, licenses: v }))} />
              </Row>
              <Row label="Previous teams coached">
                <YesNo value={coach.previousTeams} onChange={(v) => setCoach((p) => ({ ...p, previousTeams: v }))} />
              </Row>
              <Row label="Coaching performance history">
                <YesNo value={coach.performanceHistory} onChange={(v) => setCoach((p) => ({ ...p, performanceHistory: v }))} />
              </Row>
            </div>
          </AnimatedSection>

          {/* ── §10 Youth & Grassroots ── */}
          <AnimatedSection delay={240}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="10" title="Youth & Grassroots Access" />
              <p className="text-xs font-light text-muted-foreground mb-5">
                Check each permission that should apply to each entity type.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left font-display text-xs tracking-wider uppercase text-muted-foreground pb-3 pr-4 font-normal">Entity</th>
                      <th className="text-center font-display text-xs tracking-wider uppercase text-muted-foreground pb-3 px-4 font-normal">Register Players</th>
                      <th className="text-center font-display text-xs tracking-wider uppercase text-muted-foreground pb-3 px-4 font-normal">Enter Competitions</th>
                      <th className="text-center font-display text-xs tracking-wider uppercase text-muted-foreground pb-3 px-4 font-normal">Maintain Records</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      [
                        ["Schools football", "schoolsRegister", "schoolsCompetitions", "schoolsRecords"],
                        ["Academies", "academiesRegister", "academiesCompetitions", "academiesRecords"],
                        ["Youth leagues", "youthLeaguesRegister", "youthLeaguesCompetitions", "youthLeaguesRecords"],
                        ["Grassroots programs", "grassrootsRegister", "grassrootsCompetitions", "grassrootsRecords"],
                      ] as [string, keyof typeof youth, keyof typeof youth, keyof typeof youth][]
                    ).map(([label, k1, k2, k3]) => (
                      <tr key={label} className="border-b border-border/10 last:border-0">
                        <td className="py-3 pr-4 font-light text-foreground">{label}</td>
                        {[k1, k2, k3].map((k) => (
                          <td key={k} className="text-center py-3 px-4">
                            <input
                              type="checkbox"
                              checked={youth[k]}
                              onChange={(e) => setYouth((p) => ({ ...p, [k]: e.target.checked }))}
                              className="w-4 h-4 rounded border-border/40 accent-primary cursor-pointer"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>

          {/* ── §11 Gender Inclusivity ── */}
          <AnimatedSection delay={260}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="11" title="Gender Inclusivity" />
              <p className="text-xs font-light text-muted-foreground mb-5">
                Select which competition levels should support male and / or female competitions.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left font-display text-xs tracking-wider uppercase text-muted-foreground pb-3 pr-4 font-normal">Competition Level</th>
                      <th className="text-center font-display text-xs tracking-wider uppercase text-muted-foreground pb-3 px-8 font-normal">Male</th>
                      <th className="text-center font-display text-xs tracking-wider uppercase text-muted-foreground pb-3 px-8 font-normal">Female</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      [
                        ["Youth leagues", "youthMale", "youthFemale"],
                        ["Regional leagues", "regionalMale", "regionalFemale"],
                        ["Professional leagues", "professionalMale", "professionalFemale"],
                        ["Futsal competitions", "futsalMale", "futsalFemale"],
                      ] as [string, keyof typeof gender, keyof typeof gender][]
                    ).map(([label, male, female]) => (
                      <tr key={label} className="border-b border-border/10 last:border-0">
                        <td className="py-3 pr-4 font-light text-foreground">{label}</td>
                        <td className="text-center py-3 px-8">
                          <input type="checkbox" checked={gender[male]} onChange={(e) => setGender((p) => ({ ...p, [male]: e.target.checked }))} className="w-4 h-4 rounded border-border/40 accent-primary cursor-pointer" />
                        </td>
                        <td className="text-center py-3 px-8">
                          <input type="checkbox" checked={gender[female]} onChange={(e) => setGender((p) => ({ ...p, [female]: e.target.checked }))} className="w-4 h-4 rounded border-border/40 accent-primary cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>

          {/* ── §12 FIFA Alignment ── */}
          <AnimatedSection delay={280}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="12" title="FIFA System Alignment" />
              <div className="space-y-1.5 mb-5">
                <Label className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                  FIFA Connect identifier currently in use
                </Label>
                <Input value={fifaId} onChange={(e) => setFifaId(e.target.value)} placeholder="e.g. ZIM-001" className={inputCls} />
              </div>
              <Row label="Synchronise with zim_uat.ma.services?">
                <YesNo value={fifaSync} onChange={setFifaSync} />
              </Row>
              <div className="mt-4 space-y-1.5">
                <Label className="text-xs font-display tracking-wider uppercase text-muted-foreground">
                  Additional FIFA data compliance requirements
                </Label>
                <Input value={fifaNotes} onChange={(e) => setFifaNotes(e.target.value)} placeholder="Any specific compliance notes…" className={inputCls} />
              </div>
            </div>
          </AnimatedSection>

          {/* ── Additional Notes ── */}
          <AnimatedSection delay={300}>
            <div className="card-glass rounded-lg p-6 md:p-8">
              <SectionHeader num="—" title="Additional Notes" />
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any other information, corrections, or questions…"
                className={`${inputCls} min-h-[100px]`}
              />
            </div>
          </AnimatedSection>

          {/* ── Submit ── */}
          <AnimatedSection delay={320}>
            {status === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 rounded-md px-3 py-2 mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {formspreeConfigured
                  ? "Something went wrong. Please try again."
                  : "Submission unavailable — please email cto@mathbrooks.com directly."}
              </div>
            )}
            <Button
              type="submit"
              disabled={!isValid || status === "submitting" || !formspreeConfigured}
              className="w-full font-display text-xs tracking-[0.1em] uppercase h-11"
            >
              <Send className="w-3.5 h-3.5 mr-2" />
              {status === "submitting" ? "Submitting…" : "Submit Requirements"}
            </Button>
            <p className="text-xs font-light text-muted-foreground text-center mt-3">
              Responses go directly to the MathBrooks development team — cto@mathbrooks.com
            </p>
          </AnimatedSection>

        </form>
      </div>
    </div>
  );
};

export default Zifa;
