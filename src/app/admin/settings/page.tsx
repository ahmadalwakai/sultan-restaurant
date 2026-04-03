"use client";

import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { adminHeadings } from "@/lib/admin-content";
import { Box, Button, Card, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";

const TABS = ["General", "Contact", "Social Links", "Opening Hours", "Homepage", "Delivery Partners"] as const;

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<typeof TABS[number]>("General");
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const endpoints: Record<string, string> = {
    General: "general",
    Contact: "contact",
    "Social Links": "social-links",
    Homepage: "homepage",
  };

  useEffect(() => {
    if (tab === "Opening Hours" || tab === "Delivery Partners") return;
    const endpoint = endpoints[tab];
    if (!endpoint) return;
    fetch(`/api/admin/settings/${endpoint}`).then((r) => r.json()).then((d) => setSettings(d.data ?? {}));
  }, [tab]);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const endpoint = endpoints[tab];
    await fetch(`/api/admin/settings/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
  }

  function renderForm() {
    if (tab === "Opening Hours") return <OpeningHoursTab />;
    if (tab === "Delivery Partners") return <Text fontSize="sm" color="gray.500">Delivery partners management coming soon.</Text>;

    const fields: Record<string, string[]> = {
      General: ["siteName", "tagline", "description"],
      Contact: ["phone", "email", "address", "city", "postcode"],
      "Social Links": ["facebook", "instagram", "twitter", "youtube", "tiktok"],
      Homepage: ["heroTitle", "heroSubtitle", "heroCtaText"],
    };

    return (
      <form onSubmit={handleSave}>
        <VStack gap={4} align="stretch" maxW="36rem">
          {(fields[tab] ?? []).map((key) => (
            <Box key={key}>
              <Text as="label" display="block" fontSize="sm" fontWeight={500} color="gray.700" mb={1}>{key.replace(/([A-Z])/g, " $1")}</Text>
              <Input
                value={settings[key] ?? ""}
                onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
                size="sm"
                borderColor="gray.300"
                _focus={{ borderColor: "yellow.500", boxShadow: "0 0 0 1px var(--chakra-colors-yellow-500)" }}
              />
            </Box>
          ))}
          <Box>
            <Button type="submit" disabled={saving} size="sm" bg="yellow.500" color="white" _hover={{ bg: "yellow.600" }} px={6} opacity={saving ? 0.5 : 1}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </Box>
        </VStack>
      </form>
    );
  }

  return (
    <AdminShell>
      <AdminPageShell>
        <AdminSectionTitle title={adminHeadings.settings.title} description={adminHeadings.settings.description} />

        <HStack gap={1} borderBottom="1px solid" borderColor="gray.200" mb={6}>
          {TABS.map((t) => (
            <Button
              key={t}
              onClick={() => setTab(t)}
              variant="plain"
              size="sm"
              fontWeight={500}
              borderBottom="2px solid"
              borderColor={tab === t ? "yellow.500" : "transparent"}
              color={tab === t ? "yellow.600" : "gray.500"}
              borderRadius={0}
              mb="-1px"
              px={4}
              py={2}
            >
              {t}
            </Button>
          ))}
        </HStack>

        <Card.Root shadow="sm" borderRadius="xl">
          <Card.Body p={6}>
            {renderForm()}
          </Card.Body>
        </Card.Root>
      </AdminPageShell>
    </AdminShell>
  );
}

function OpeningHoursTab() {
  const [hours, setHours] = useState<Array<{ dayOfWeek: number; openTime: string; closeTime: string; isClosed: boolean }>>([]);
  const [saving, setSaving] = useState(false);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    fetch("/api/admin/settings/opening-hours").then((r) => r.json()).then((d) => {
      if (d.data?.length) setHours(d.data);
      else setHours(days.map((_, i) => ({ dayOfWeek: i, openTime: "12:00", closeTime: "21:00", isClosed: false })));
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/admin/settings/opening-hours", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hours),
    });
    setSaving(false);
  }

  return (
    <VStack gap={3} align="stretch" maxW="36rem">
      {hours.map((h, i) => (
        <Flex key={h.dayOfWeek} align="center" gap={3}>
          <Text w="6rem" fontSize="sm" fontWeight={500} color="gray.700">{days[h.dayOfWeek]}</Text>
          <Flex as="label" align="center" gap={1} fontSize="sm" color="gray.700">
            <input type="checkbox" checked={!h.isClosed} onChange={(e) => { const next = [...hours]; next[i] = { ...h, isClosed: !e.target.checked }; setHours(next); }} />
            Open
          </Flex>
          {!h.isClosed && (
            <>
              <Input type="time" value={h.openTime} onChange={(e) => { const next = [...hours]; next[i] = { ...h, openTime: e.target.value }; setHours(next); }} size="sm" w="auto" px={2} borderColor="gray.300" _focus={{ borderColor: "yellow.500", boxShadow: "0 0 0 1px var(--chakra-colors-yellow-500)" }} />
              <Text color="gray.500">-</Text>
              <Input type="time" value={h.closeTime} onChange={(e) => { const next = [...hours]; next[i] = { ...h, closeTime: e.target.value }; setHours(next); }} size="sm" w="auto" px={2} borderColor="gray.300" _focus={{ borderColor: "yellow.500", boxShadow: "0 0 0 1px var(--chakra-colors-yellow-500)" }} />
            </>
          )}
        </Flex>
      ))}
      <Box>
        <Button onClick={handleSave} disabled={saving} size="sm" bg="yellow.500" color="white" _hover={{ bg: "yellow.600" }} px={6} opacity={saving ? 0.5 : 1}>
          {saving ? "Saving..." : "Save Hours"}
        </Button>
      </Box>
    </VStack>
  );
}
