"use client";

import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { AdminSwitch } from "@/components/admin/forms/AdminSwitch";
import { adminHeadings } from "@/lib/admin-content";
import { Box, Button, Card, Flex, HStack, Input, Text, VStack, Textarea, Badge } from "@chakra-ui/react";
import toast from "react-hot-toast";

const TABS = ["General", "Contact", "Ordering", "Social Links", "Opening Hours", "Homepage", "Delivery Partners"] as const;

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
    if (tab === "Ordering") return <OrderingControlsTab />;
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

function OrderingControlsTab() {
  const [pickupEnabled, setPickupEnabled] = useState(true);
  const [deliveryEnabled, setDeliveryEnabled] = useState(true);
  const [pickupMessage, setPickupMessage] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings/ordering")
      .then((r) => r.json())
      .then((d) => {
        if (d.data) {
          setPickupEnabled(d.data.pickupEnabled !== "false");
          setDeliveryEnabled(d.data.deliveryEnabled !== "false");
          setPickupMessage(d.data.pickupPauseMessage || "");
          setDeliveryMessage(d.data.deliveryPauseMessage || "");
        }
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch("/api/admin/settings/ordering", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickupEnabled,
          deliveryEnabled,
          pickupPauseMessage: pickupMessage,
          deliveryPauseMessage: deliveryMessage,
        }),
      });
      toast.success("Ordering settings saved!");
    } catch {
      toast.error("Failed to save settings");
    }
    setSaving(false);
  }

  if (loading) return <Text color="gray.500">Loading...</Text>;

  return (
    <VStack gap={6} align="stretch" maxW="36rem">
      {/* Status Overview */}
      <Box p={4} bg={!pickupEnabled || !deliveryEnabled ? "red.50" : "green.50"} borderRadius="lg" borderWidth="1px" borderColor={!pickupEnabled || !deliveryEnabled ? "red.200" : "green.200"}>
        <HStack gap={4}>
          <Badge colorPalette={pickupEnabled ? "green" : "red"} size="lg" px={3} py={1}>
            Pickup: {pickupEnabled ? "Active" : "Paused"}
          </Badge>
          <Badge colorPalette={deliveryEnabled ? "green" : "red"} size="lg" px={3} py={1}>
            Delivery: {deliveryEnabled ? "Active" : "Paused"}
          </Badge>
        </HStack>
        {(!pickupEnabled || !deliveryEnabled) && (
          <Text mt={2} fontSize="sm" color="red.600" fontWeight={500}>
            ⚠️ Some order types are currently paused
          </Text>
        )}
      </Box>

      {/* Pickup Control */}
      <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="lg">
        <Flex align="center" justify="space-between" mb={3}>
          <Box>
            <Text fontWeight={600} color="gray.800">Pickup Orders</Text>
            <Text fontSize="sm" color="gray.500">Allow customers to place pickup orders</Text>
          </Box>
          <HStack gap={2}>
            <AdminSwitch
              checked={pickupEnabled}
              onChange={setPickupEnabled}
            />
            <Text fontWeight={500} color={pickupEnabled ? "green.600" : "red.600"}>
              {pickupEnabled ? "Active" : "Paused"}
            </Text>
          </HStack>
        </Flex>
        {!pickupEnabled && (
          <Box mt={3}>
            <Text as="label" fontSize="sm" fontWeight={500} color="gray.700" mb={1} display="block">
              Pause Message (shown to customers)
            </Text>
            <Textarea
              value={pickupMessage}
              onChange={(e) => setPickupMessage(e.target.value)}
              placeholder="Pickup is temporarily unavailable..."
              size="sm"
              rows={2}
              borderColor="gray.300"
              _focus={{ borderColor: "yellow.500" }}
            />
          </Box>
        )}
      </Box>

      {/* Delivery Control */}
      <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="lg">
        <Flex align="center" justify="space-between" mb={3}>
          <Box>
            <Text fontWeight={600} color="gray.800">Delivery Orders</Text>
            <Text fontSize="sm" color="gray.500">Allow customers to place delivery orders</Text>
          </Box>
          <HStack gap={2}>
            <AdminSwitch
              checked={deliveryEnabled}
              onChange={setDeliveryEnabled}
            />
            <Text fontWeight={500} color={deliveryEnabled ? "green.600" : "red.600"}>
              {deliveryEnabled ? "Active" : "Paused"}
            </Text>
          </HStack>
        </Flex>
        {!deliveryEnabled && (
          <Box mt={3}>
            <Text as="label" fontSize="sm" fontWeight={500} color="gray.700" mb={1} display="block">
              Pause Message (shown to customers)
            </Text>
            <Textarea
              value={deliveryMessage}
              onChange={(e) => setDeliveryMessage(e.target.value)}
              placeholder="Delivery is temporarily unavailable..."
              size="sm"
              rows={2}
              borderColor="gray.300"
              _focus={{ borderColor: "yellow.500" }}
            />
          </Box>
        )}
      </Box>

      {/* Quick Pause All */}
      {(pickupEnabled || deliveryEnabled) && (
        <Button
          onClick={async () => { 
            setPickupEnabled(false); 
            setDeliveryEnabled(false);
            setSaving(true);
            try {
              await fetch("/api/admin/settings/ordering", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  pickupEnabled: false,
                  deliveryEnabled: false,
                  pickupPauseMessage: pickupMessage,
                  deliveryPauseMessage: deliveryMessage,
                }),
              });
              toast.success("All orders paused!");
            } catch {
              toast.error("Failed to pause orders");
            }
            setSaving(false);
          }}
          disabled={saving}
          colorPalette="red"
          variant="outline"
          size="sm"
        >
          ⏸️ Pause All Orders
        </Button>
      )}

      {/* Quick Resume All */}
      {(!pickupEnabled || !deliveryEnabled) && (
        <Button
          onClick={async () => { 
            setPickupEnabled(true); 
            setDeliveryEnabled(true);
            setSaving(true);
            try {
              await fetch("/api/admin/settings/ordering", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  pickupEnabled: true,
                  deliveryEnabled: true,
                  pickupPauseMessage: pickupMessage,
                  deliveryPauseMessage: deliveryMessage,
                }),
              });
              toast.success("All orders resumed!");
            } catch {
              toast.error("Failed to resume orders");
            }
            setSaving(false);
          }}
          disabled={saving}
          colorPalette="green"
          variant="outline"
          size="sm"
        >
          ▶️ Resume All Orders
        </Button>
      )}

      {/* Save Button */}
      <Box>
        <Button
          onClick={handleSave}
          disabled={saving}
          size="sm"
          bg="yellow.500"
          color="white"
          _hover={{ bg: "yellow.600" }}
          px={6}
          opacity={saving ? 0.5 : 1}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </VStack>
  );
}
