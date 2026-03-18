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
          : "border-gray-300 text-gray-600 hover:border-primary/60"
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
          : "border-gray-300 text-gray-600 hover:border-red-400/60"
      }`}
    >
      No
    </button>
  </div>
);

const SectionHeader = ({ num, title }: { num: string; title: string }) => (
  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-200">
    {num !== "—" ? (
      <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 border border-primary/30 font-display text-[10px] tracking-widest text-primary">{num}</span>
    ) : (
      <span className="shrink-0 w-1 h-5 rounded-full bg-primary/40 block" />
    )}
    <h2 className="font-display text-sm tracking-wider uppercase text-black">{title}</h2>
  </div>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 py-3 border-b border-gray-100 last:border-0">
    <span className="text-sm font-light text-gray-800 leading-snug">{label}</span>
    <div className="shrink-0">{children}</div>
  </div>
);

const selectCls =
  "h-9 rounded border border-gray-300 bg-white px-2 text-xs font-light text-gray-900 focus:outline-none focus:border-primary/60 transition-colors w-full sm:w-[185px]";

const inputCls = "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary/60";
const labelCls = "text-xs font-display tracking-wider uppercase text-gray-500";
const descCls = "text-xs font-light text-gray-600 mb-5";

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
      <div className="light min-h-screen bg-background flex items-center justify-center px-6">
        <AnimatedSection>
          <div className="card-glass rounded-lg p-10 max-w-md w-full text-center space-y-6">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
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
    <div className="light min-h-screen bg-background relative overflow-x-hidden">

      {/* ── Football background animation ── */}
      <style>{`
        @keyframes zifaBall1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%  { transform: translateY(-35px) rotate(130deg); }
          66%  { transform: translateY(18px) rotate(250deg); }
        }
        @keyframes zifaBall2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%  { transform: translateY(-45px) rotate(180deg); }
        }
        @keyframes zifaBall3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25%  { transform: translateY(22px) rotate(90deg); }
          75%  { transform: translateY(-25px) rotate(270deg); }
        }
        .zb1 { animation: zifaBall1 14s ease-in-out infinite; }
        .zb2 { animation: zifaBall2 18s ease-in-out infinite; }
        .zb3 { animation: zifaBall3 11s ease-in-out infinite; }
        .zb4 { animation: zifaBall1 16s ease-in-out infinite reverse; }
        .zb5 { animation: zifaBall2 20s ease-in-out infinite reverse; }
        .zb6 { animation: zifaBall3 13s ease-in-out infinite; }
      `}</style>
      <div className="fixed inset-0 pointer-events-none select-none" aria-hidden="true">
        <span className="zb1 absolute text-[7rem] opacity-[0.13] top-[8%]  left-[3%]">⚽</span>
        <span className="zb2 absolute text-[10rem] opacity-[0.10] top-[55%] right-[5%]">⚽</span>
        <span className="zb3 absolute text-[5rem] opacity-[0.14] top-[30%] right-[10%]">⚽</span>
        <span className="zb4 absolute text-[8rem] opacity-[0.09] top-[72%] left-[18%]">⚽</span>
        <span className="zb5 absolute text-[4rem] opacity-[0.15] top-[18%] right-[30%]">⚽</span>
        <span className="zb6 absolute text-[6rem] opacity-[0.11] top-[85%] right-[40%]">⚽</span>
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-20">

        <AnimatedSection>
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-4">
              <span className="text-[10px] font-display tracking-[0.2em] uppercase text-primary">MathBrooks × ZIFA</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight mb-3 text-black">
              ZIFA Requirements Form
            </h1>
            <div className="w-12 h-0.5 bg-primary mb-4" />
            <p className="text-sm font-light text-gray-600 leading-relaxed max-w-xl">
              Complete all sections and submit — this gives the development team everything
              needed to configure the system to ZIFA's operational requirements.
            </p>
          </div>
        </AnimatedSection>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Contact ── */}
          <AnimatedSection delay={60}>
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="—" title="Your Details" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="c-name" className={labelCls}>
                    Name <span className="text-red-400">*</span>
                  </Label>
                  <Input id="c-name" value={cName} onChange={(e) => setCName(e.target.value)} placeholder="Full name" required className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-title" className={labelCls}>Title / Role</Label>
                  <Input id="c-title" value={cTitle} onChange={(e) => setCTitle(e.target.value)} placeholder="e.g. General Secretary" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-email" className={labelCls}>
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input id="c-email" type="email" value={cEmail} onChange={(e) => setCEmail(e.target.value)} placeholder="you@zifa.co.zw" required className={inputCls} />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── §2 Approving Authority ── */}
          <AnimatedSection delay={80}>
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="02" title="Governance — Approving Authority" />
              <p className={descCls}>
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
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="03" title="National Administrative Structure" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="space-y-1.5">
                  <Label className={labelCls}>
                    Total Regions / Provinces
                  </Label>
                  <Input type="number" min="0" value={totalRegions} onChange={(e) => setTotalRegions(e.target.value)} placeholder="e.g. 10" className={inputCls} />
                </div>
                <div className="space-y-1.5">
                  <Label className={labelCls}>
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
                <Label className={labelCls}>
                  Corrections to hierarchy (if any)
                </Label>
                <Input value={adminCorrections} onChange={(e) => setAdminCorrections(e.target.value)} placeholder="e.g. Rename 'Area Zone' to 'District'" className={inputCls} />
              </div>
            </div>
          </AnimatedSection>

          {/* ── §4 User Roles ── */}
          <AnimatedSection delay={120}>
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="04" title="User Roles & Access Levels" />
              <p className={descCls}>
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
                    <p className="text-xs text-gray-500 font-light">{desc}</p>
                  </div>
                  <YesNo value={roles[key]} onChange={(v) => setRoles((p) => ({ ...p, [key]: v }))} />
                </div>
              ))}
              <div className="mt-4 space-y-1.5">
                <Label className={labelCls}>
                  Additional roles needed
                </Label>
                <Input value={additionalRoles} onChange={(e) => setAdditionalRoles(e.target.value)} placeholder="e.g. Medical Officer, Media Officer…" className={inputCls} />
              </div>
            </div>
          </AnimatedSection>

          {/* ── §5 Player Docs ── */}
          <AnimatedSection delay={140}>
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="05" title="Player Registration — Required Documents" />
              <p className={descCls}>
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
                    <span className="text-sm font-light text-gray-800 group-hover:text-primary transition-colors">{label}</span>
                  </label>
                ))}
                <div className="space-y-1.5 pt-1">
                  <Label className={labelCls}>
                    Other documents
                  </Label>
                  <Input value={playerDocsOther} onChange={(e) => setPlayerDocsOther(e.target.value)} placeholder="Any additional required documents…" className={inputCls} />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── §6 Identity Verification ── */}
          <AnimatedSection delay={160}>
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="06" title="Player Identity Verification" />
              <p className={descCls}>
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
                <Label className={labelCls}>
                  Other verification methods
                </Label>
                <Input value={verifOther} onChange={(e) => setVerifOther(e.target.value)} placeholder="e.g. Biometric check…" className={inputCls} />
              </div>
            </div>
          </AnimatedSection>

          {/* ── §7 Competition Management ── */}
          <AnimatedSection delay={180}>
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="07" title="Competition Management" />
              <div className="mb-6 space-y-2">
                <Label className={labelCls}>
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
                          : "border-gray-300 text-gray-600 hover:border-primary/60"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs font-display tracking-wider uppercase text-gray-500 mb-2">
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
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="08" title="Match Data Fields" />
              <p className={descCls}>
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
                <Label className={labelCls}>Notes</Label>
                <Input value={matchDataNotes} onChange={(e) => setMatchDataNotes(e.target.value)} placeholder="Any additional match data requirements…" className={inputCls} />
              </div>
            </div>
          </AnimatedSection>

          {/* ── §9 Coach Records ── */}
          <AnimatedSection delay={220}>
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="09" title="Coach & Staff Records" />
              <p className={descCls}>
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
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="10" title="Youth & Grassroots Access" />
              <p className={descCls}>
                Check each permission that should apply to each entity type.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left font-display text-xs tracking-wider uppercase text-gray-500 pb-3 pr-4 font-normal">Entity</th>
                      <th className="text-center font-display text-xs tracking-wider uppercase text-gray-500 pb-3 px-4 font-normal">Register Players</th>
                      <th className="text-center font-display text-xs tracking-wider uppercase text-gray-500 pb-3 px-4 font-normal">Enter Competitions</th>
                      <th className="text-center font-display text-xs tracking-wider uppercase text-gray-500 pb-3 px-4 font-normal">Maintain Records</th>
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
                        <td className="py-3 pr-4 font-light text-gray-900">{label}</td>
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
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="11" title="Gender Inclusivity" />
              <p className={descCls}>
                Select which competition levels should support male and / or female competitions.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left font-display text-xs tracking-wider uppercase text-gray-500 pb-3 pr-4 font-normal">Competition Level</th>
                      <th className="text-center font-display text-xs tracking-wider uppercase text-gray-500 pb-3 px-8 font-normal">Male</th>
                      <th className="text-center font-display text-xs tracking-wider uppercase text-gray-500 pb-3 px-8 font-normal">Female</th>
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
                        <td className="py-3 pr-4 font-light text-gray-900">{label}</td>
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
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
              <SectionHeader num="12" title="FIFA System Alignment" />
              <div className="space-y-1.5 mb-5">
                <Label className={labelCls}>
                  FIFA Connect identifier currently in use
                </Label>
                <Input value={fifaId} onChange={(e) => setFifaId(e.target.value)} placeholder="e.g. ZIM-001" className={inputCls} />
              </div>
              <Row label="Synchronise with zim_uat.ma.services?">
                <YesNo value={fifaSync} onChange={setFifaSync} />
              </Row>
              <div className="mt-4 space-y-1.5">
                <Label className={labelCls}>
                  Additional FIFA data compliance requirements
                </Label>
                <Input value={fifaNotes} onChange={(e) => setFifaNotes(e.target.value)} placeholder="Any specific compliance notes…" className={inputCls} />
              </div>
            </div>
          </AnimatedSection>

          {/* ── Additional Notes ── */}
          <AnimatedSection delay={300}>
            <div className="card-glass rounded-lg p-6 md:p-8 border-l-2 border-primary/30">
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
          </AnimatedSection>

        </form>
      </div>
    </div>
  );
};

export default Zifa;
