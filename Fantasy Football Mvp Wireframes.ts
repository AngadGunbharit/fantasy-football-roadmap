import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Menu, Users, Settings, Sparkles, Search, Plus, X, ArrowRight, DollarSign, Filter, BarChart as Bar } from "lucide-react";

/**
 * Fantasy Football MVP Wireframes (Lo/Mid-Fi)
 * - Single-file React app with Tailwind + shadcn/ui
 * - Screens: Dashboard, Draft Builder, Lineup Optimizer, Player Profile, Waivers/Trades
 * - Intentionally simple logic + placeholder data to keep it wireframe-friendly
 */

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: Sparkles },
  { key: "draft", label: "Draft", icon: Plus },
  { key: "optimizer", label: "Lineup", icon: Bar },
  { key: "profile", label: "Player", icon: Users },
  { key: "waivers", label: "Waivers/Trades", icon: Menu },
  { key: "settings", label: "Settings", icon: Settings },
];

const SAMPLE_PLAYERS = [
  { id: 1, name: "J. Allen", pos: "QB", team: "BUF", cost: 18, proj: 24.6 },
  { id: 2, name: "C. McCaffrey", pos: "RB", team: "SF", cost: 21, proj: 22.1 },
  { id: 3, name: "J. Jefferson", pos: "WR", team: "MIN", cost: 20, proj: 20.4 },
  { id: 4, name: "T. Kelce", pos: "TE", team: "KC", cost: 16, proj: 17.8 },
  { id: 5, name: "A. St. Brown", pos: "WR", team: "DET", cost: 17, proj: 18.9 },
  { id: 6, name: "B. Hall", pos: "RB", team: "NYJ", cost: 15, proj: 16.7 },
  { id: 7, name: "R. Rice", pos: "WR", team: "KC", cost: 14, proj: 16.2 },
  { id: 8, name: "N. Collins", pos: "WR", team: "HOU", cost: 13, proj: 15.4 },
  { id: 9, name: "J. Chase", pos: "WR", team: "CIN", cost: 19, proj: 19.6 },
  { id: 10, name: "A. Kamara", pos: "RB", team: "NO", cost: 12, proj: 14.1 },
];

const ROSTER_TEMPLATE = [
  { slot: "QB", allow: ["QB"] },
  { slot: "RB1", allow: ["RB"] },
  { slot: "RB2", allow: ["RB"] },
  { slot: "WR1", allow: ["WR"] },
  { slot: "WR2", allow: ["WR"] },
  { slot: "TE", allow: ["TE"] },
  { slot: "FLEX", allow: ["RB", "WR", "TE"] },
  { slot: "DST", allow: ["DST"] },
];

const SALARY_CAP = 100; // wireframe cap

function TopBar({ onGo, active }) {
  return (
    <div className="sticky top-0 z-20 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6" />
          <span className="font-semibold">FantasyLab</span>
          <div className="hidden gap-1 md:flex">
            {NAV_ITEMS.slice(0, 5).map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={active === key ? "default" : "ghost"}
                size="sm"
                className="gap-2"
                onClick={() => onGo(key)}
              >
                <Icon className="h-4 w-4" /> {label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Input className="w-48" placeholder="Search players, teams..." />
          <Avatar>
            <AvatarFallback>VG</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, right }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-lg font-semibold">{title}</h3>
      {right}
    </div>
  );
}

function Stat({ label, value, icon: Icon }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex items-center gap-3 p-4">
        {Icon && <Icon className="h-5 w-5" />}
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-xl font-semibold">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Matchups</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Week {i} · BUF @ KC</div>
                  <div className="text-sm text-muted-foreground">Sun 1:25p</div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Weather: Mild · Vegas O/U: 49.5
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Team Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <Stat label="Team Points (Proj)" value="137.4" icon={Bar} />
            <Stat label="Cap Remaining" value="$18" icon={DollarSign} />
            <Stat label="Lineups Saved" value="7" />
            <Stat label="Trades Pending" value="2" />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="secondary">Open Draft Center</Button>
            <Button variant="secondary">Run Lineup Optimizer</Button>
            <Button variant="secondary">Check Waivers</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trending Players</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {SAMPLE_PLAYERS.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="font-medium">{p.name} · {p.pos}</div>
                  <div className="text-xs text-muted-foreground">{p.team} · Proj {p.proj} pts</div>
                </div>
                <Button size="icon" variant="ghost"><Plus className="h-4 w-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PlayerCard({ p, onAdd, onRemove, compact }) {
  return (
    <div className={`flex items-center justify-between rounded-xl border p-3 ${compact ? "" : "shadow-sm"}`}>
      <div className="min-w-0">
        <div className="truncate font-medium">{p.name} <span className="text-muted-foreground">· {p.pos}</span></div>
        <div className="text-xs text-muted-foreground">{p.team} · Proj {p.proj} · Cost ${p.cost}</div>
      </div>
      <div className="flex items-center gap-2">
        {onAdd && (
          <Button size="icon" variant="secondary" onClick={() => onAdd(p)}>
            <Plus className="h-4 w-4" />
          </Button>
        )}
        {onRemove && (
          <Button size="icon" variant="ghost" onClick={() => onRemove(p)}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function DraftBuilder() {
  const [query, setQuery] = useState("");
  const [pos, setPos] = useState("ALL");
  const [roster, setRoster] = useState({}); // slot -> player

  const filtered = useMemo(() => {
    return SAMPLE_PLAYERS.filter((p) =>
      (pos === "ALL" || p.pos === pos) &&
      (query.trim() === "" || `${p.name} ${p.team}`.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, pos]);

  const capUsed = Object.values(roster).reduce((acc, p) => acc + (p?.cost || 0), 0);
  const capLeft = SALARY_CAP - capUsed;

  function addToSlot(slot, player) {
    // prevent duplicate player in multiple slots
    const exists = Object.values(roster).some((p) => p?.id === player.id);
    if (exists) return;
    // position check
    const template = ROSTER_TEMPLATE.find((r) => r.slot === slot);
    if (template && !template.allow.includes(player.pos)) return;
    setRoster((r) => ({ ...r, [slot]: player }));
  }

  function removeFromSlot(slot) {
    setRoster((r) => ({ ...r, [slot]: undefined }));
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Player Pool</span>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Search players..." value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <Select value={pos} onValueChange={setPos}>
                  <SelectTrigger className="w-[120px]"><SelectValue placeholder="Pos" /></SelectTrigger>
                  <SelectContent>
                    {"ALL QB RB WR TE DST".split(" ").map((k) => (
                      <SelectItem key={k} value={k}>{k}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PlayerCard key={p.id} p={p} onAdd={(pl) => {
                // auto-place into first available slot that allows the pos
                const target = ROSTER_TEMPLATE.find(({ slot, allow }) => !roster[slot] && allow.includes(pl.pos));
                if (target) addToSlot(target.slot, pl);
              }} />
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>My Roster</span>
              <span className={`${capLeft < 0 ? "text-red-600" : "text-emerald-600"} text-sm font-medium`}>Cap Left: ${capLeft}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ROSTER_TEMPLATE.map(({ slot }) => (
              <div key={slot} className="rounded-lg border p-2">
                <div className="mb-1 text-xs text-muted-foreground">{slot}</div>
                {roster[slot] ? (
                  <PlayerCard p={roster[slot]} onRemove={() => removeFromSlot(slot)} compact />
                ) : (
                  <div className="text-sm text-muted-foreground">Empty</div>
                )}
              </div>
            ))}
            <div className="pt-2">
              <Button className="w-full">Save Lineup</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Salary Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground">Drag to simulate budget preference</div>
              <div className="space-y-2">
                {["QB", "RB", "WR", "TE", "FLEX"].map((k) => (
                  <div key={k} className="grid grid-cols-3 items-center gap-2">
                    <div className="text-xs text-muted-foreground">{k}</div>
                    <div className="col-span-2"><Slider defaultValue={[20]} max={40} step={1} /></div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BarComparison({ yours = 120, optimal = 134 }) {
  const max = Math.max(yours, optimal) + 10;
  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 flex items-center justify-between text-xs"><span>Your Lineup</span><span>{yours} pts</span></div>
        <div className="h-2 w-full rounded bg-muted">
          <div className="h-2 rounded bg-foreground" style={{ width: `${(yours / max) * 100}%` }} />
        </div>
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between text-xs"><span>Suggested Optimal</span><span>{optimal} pts</span></div>
        <div className="h-2 w-full rounded bg-muted">
          <div className="h-2 rounded bg-foreground/70" style={{ width: `${(optimal / max) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

function LineupOptimizer() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Suggested Optimal Lineup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {SAMPLE_PLAYERS.slice(0, 7).map((p) => <PlayerCard key={`opt-${p.id}`} p={p} compact />)}
          <div className="pt-2"><BarComparison yours={120} optimal={134} /></div>
          <div className="pt-2 flex gap-2">
            <Button>Confirm Lineup</Button>
            <Button variant="outline" className="gap-2">Export <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Current Lineup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ROSTER_TEMPLATE.slice(0, 7).map((r, i) => (
            <div key={i} className="rounded-lg border p-2">
              <div className="mb-1 text-xs text-muted-foreground">{r.slot}</div>
              <PlayerCard p={SAMPLE_PLAYERS[i]} compact />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function PlayerProfile() {
  const p = SAMPLE_PLAYERS[0];
  return (
    <div className="mx-auto grid max-w-5xl gap-6 p-4 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Avatar><AvatarFallback>{p.name.split(" ")[0][0]}{p.name.split(" ")[1][0]}</AvatarFallback></Avatar>
              <span>{p.name} · {p.team}</span>
              <span className="text-sm font-normal text-muted-foreground">{p.pos}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Stat label="Avg Points (L5)" value="23.1" />
            <Stat label="Snap %" value="92%" />
            <Stat label="Target Share" value="28%" />
            <Stat label="Red Zone Touches" value="8" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Matchup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>Opponent: KC (Away)</div>
            <div>Weather: 72°F · Light wind</div>
            <div>Vegas Line: BUF +2.5 · O/U 49.5</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button>Add to Team</Button>
            <Button variant="secondary">Add to Watchlist</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function WaiversTrades() {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <Tabs defaultValue="waivers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="waivers">Waivers</TabsTrigger>
          <TabsTrigger value="trades">Trades</TabsTrigger>
        </TabsList>
        <TabsContent value="waivers">
          <Card>
            <CardHeader>
              <CardTitle>Available Players</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SAMPLE_PLAYERS.slice(3).map((p) => (
                <div key={`waiver-${p.id}`} className="rounded-xl border p-3">
                  <div className="font-medium">{p.name} · {p.pos}</div>
                  <div className="text-xs text-muted-foreground mb-2">{p.team} · Proj {p.proj} · Cost ${p.cost}</div>
                  <Button variant="secondary" size="sm">Add</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trades">
          <Card>
            <CardHeader>
              <CardTitle>My Trade Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="font-medium">Trade #{i}</div>
                    <div className="text-xs text-muted-foreground">You: Player A · Offer: Player B</div>
                  </div>
                  <Button size="sm" variant="outline">Cancel</Button>
                </div>
              ))}
              <div className="pt-2">
                <Button>Create New Trade</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <TopBar active={active} onGo={setActive} />
      {active === "dashboard" && <Dashboard />}
      {active === "draft" && <DraftBuilder />}
      {active === "optimizer" && <LineupOptimizer />}
      {active === "profile" && <PlayerProfile />}
      {active === "waivers" && <WaiversTrades />}
      {active === "settings" && (
        <div className="mx-auto max-w-4xl p-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div>Theme: System</div>
              <div>Notifications: Enabled</div>
              <div>Export Integrations: (DraftKings, FanDuel) - Placeholder</div>
            </CardContent>
          </Card>
        </div>
      )}
      <footer className="mx-auto mt-10 max-w-7xl px-4 pb-10 text-xs text-muted-foreground">
        Built as wireframes · Layouts only · Replace with real data later
      </footer>
    </div>
  );
}
