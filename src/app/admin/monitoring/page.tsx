"use client";

import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminAuthGuard } from "@/components/admin/auth/AdminAuthGuard";
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

export default function MonitoringPage() {
  const { data: healthData, isLoading: healthLoading } = useAdminHealth();
  const { logs: errorLogs, stats: errorStats } = useAdminErrors();
  const { logs: perfLogs, stats: perfStats } = useAdminPerformance({ minDuration: 3000 });
  const { data: alertData, isLoading: alertsLoading } = useAdminAlerts();
  const { data: auditData, isLoading: auditLoading } = useAdminLogs();

  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
              {healthData?.health && (
                <UptimeIndicator
                  uptime={healthData.health.uptime}
                  status={healthData.health.status}
                />
              )}
            </div>

            <div className="space-y-6">
              {/* Health Overview */}
              <HealthStatusPanel health={healthData?.health ?? null} isLoading={healthLoading} />

              {/* Stats Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ErrorRateChart stats={errorStats.data ?? null} isLoading={errorStats.isLoading} />
                <ResponseTimeChart stats={perfStats.data ?? null} isLoading={perfStats.isLoading} />
                <RequestVolumeChart stats={perfStats.data ?? null} isLoading={perfStats.isLoading} />
              </div>

              {/* Details Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentErrorsList errors={errorLogs.data?.logs ?? []} isLoading={errorLogs.isLoading} />
                <SlowQueriesList queries={perfLogs.data?.logs ?? []} isLoading={perfLogs.isLoading} />
              </div>

              {/* System & Alerts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SystemInfoCard system={healthData?.system ?? null} isLoading={healthLoading} />
                <AlertHistory alerts={alertData?.alerts ?? []} isLoading={alertsLoading} />
              </div>

              {/* Audit Log */}
              <AuditLogTable logs={auditData?.logs ?? []} isLoading={auditLoading} />
            </div>
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
