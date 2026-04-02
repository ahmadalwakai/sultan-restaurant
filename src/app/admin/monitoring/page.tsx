"use client";

import { AdminShell } from "@/components/admin/layout/AdminShell";
import { AdminPageShell, AdminSectionTitle } from "@/components/admin/shared";
import { HealthStatusPanel } from "@/components/admin/monitoring/HealthStatusPanel";
import { ErrorRateChart } from "@/components/admin/monitoring/ErrorRateChart";
import { ResponseTimeChart } from "@/components/admin/monitoring/ResponseTimeChart";
import { RequestVolumeChart } from "@/components/admin/monitoring/RequestVolumeChart";
import { RecentErrorsList } from "@/components/admin/monitoring/RecentErrorsList";
import { SlowQueriesList } from "@/components/admin/monitoring/SlowQueriesList";
import { AlertHistory } from "@/components/admin/monitoring/AlertHistory";
import { SystemInfoCard } from "@/components/admin/monitoring/SystemInfoCard";
import { UptimeIndicator } from "@/components/admin/monitoring/UptimeIndicator";
import { AuditLogTable } from "@/components/admin/monitoring/AuditLogTable";
import { useAdminHealth } from "@/hooks/use-admin-health";
import { useAdminErrors } from "@/hooks/use-admin-errors";
import { useAdminPerformance } from "@/hooks/use-admin-performance";
import { useAdminAlerts } from "@/hooks/use-admin-alerts";
import { useAdminLogs } from "@/hooks/use-admin-logs";
import { adminSpacing } from "@/lib/admin-ui";
import { adminHeadings } from "@/lib/admin-content";

export default function MonitoringPage() {
  const { data: healthData, isLoading: healthLoading } = useAdminHealth();
  const { logs: errorLogs, stats: errorStats } = useAdminErrors();
  const { logs: perfLogs, stats: perfStats } = useAdminPerformance({ minDuration: 3000 });
  const { data: alertData, isLoading: alertsLoading } = useAdminAlerts();
  const { data: auditData, isLoading: auditLoading } = useAdminLogs();

  return (
    <AdminShell>
      <AdminPageShell>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: adminSpacing.headerGap }}>
          <AdminSectionTitle title={adminHeadings.monitoring.title} description={adminHeadings.monitoring.description} />
          {healthData?.health && (
            <UptimeIndicator uptime={healthData.health.uptime} status={healthData.health.status} />
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: adminSpacing.stack }}>
          <HealthStatusPanel health={healthData?.health ?? null} isLoading={healthLoading} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: adminSpacing.grid }} className="admin-monitor-3col">
            <ErrorRateChart stats={errorStats.data ?? null} isLoading={errorStats.isLoading} />
            <ResponseTimeChart stats={perfStats.data ?? null} isLoading={perfStats.isLoading} />
            <RequestVolumeChart stats={perfStats.data ?? null} isLoading={perfStats.isLoading} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: adminSpacing.grid }} className="admin-monitor-2col">
            <RecentErrorsList errors={errorLogs.data?.logs ?? []} isLoading={errorLogs.isLoading} />
            <SlowQueriesList queries={perfLogs.data?.logs ?? []} isLoading={perfLogs.isLoading} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: adminSpacing.grid }} className="admin-monitor-2col">
            <SystemInfoCard system={healthData?.system ?? null} isLoading={healthLoading} />
            <AlertHistory alerts={alertData?.alerts ?? []} isLoading={alertsLoading} />
          </div>

          <AuditLogTable logs={auditData?.logs ?? []} isLoading={auditLoading} />
        </div>

        <style>{`
          @media (max-width: 768px) {
            .admin-monitor-3col { grid-template-columns: 1fr !important; }
            .admin-monitor-2col { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </AdminPageShell>
    </AdminShell>
  );
}
