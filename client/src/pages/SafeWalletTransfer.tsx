import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiKey, FiCheck, FiSun, FiMoon, FiAlertCircle } from "react-icons/fi";
import { SiEthereum } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/components/ThemeProvider";
import type { WalletOwner, TransferLog } from "@shared/schema";

const ownerA: WalletOwner = {
  id: "a",
  name: "Owner A",
  address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
};

const ownerB: WalletOwner = {
  id: "b",
  name: "Owner B",
  address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
};

export default function SafeWalletTransfer() {
  const { theme, toggleTheme } = useTheme();
  const [currentOwner, setCurrentOwner] = useState<WalletOwner>(ownerA);
  const [isConnected, setIsConnected] = useState(false);
  const [logs, setLogs] = useState<TransferLog[]>([]);
  const [isTransferring, setIsTransferring] = useState(false);

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = () => {
    setIsConnected(true);
    const newLog: TransferLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      from: "MetaMask",
      to: "Application",
      message: "Kết nối ví MetaMask thành công!",
      success: true,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleTransfer = async () => {
    if (!isConnected) {
      const errorLog: TransferLog = {
        id: Date.now().toString(),
        timestamp: new Date(),
        from: "System",
        to: "User",
        message: "Vui lòng kết nối ví trước khi bàn giao quyền kiểm soát.",
        success: false,
      };
      setLogs((prev) => [errorLog, ...prev]);
      return;
    }

    setIsTransferring(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const newOwner = currentOwner.id === "a" ? ownerB : ownerA;
    setCurrentOwner(newOwner);

    const successLog: TransferLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      from: currentOwner.name,
      to: newOwner.name,
      message: `Bàn giao thành công! Quyền đã chuyển sang ${newOwner.name}.`,
      success: true,
    };
    setLogs((prev) => [successLog, ...prev]);
    setIsTransferring(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5 pointer-events-none" />
      
      <div className="relative z-10">
        <header className="py-12 px-6 text-center">
          <div className="flex justify-end mb-6 max-w-6xl mx-auto">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="hover-elevate active-elevate-2"
            >
              {theme === "light" ? (
                <FiMoon className="h-5 w-5" />
              ) : (
                <FiSun className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent"
            data-testid="text-title"
          >
            Safe Wallet Transfer
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto opacity-80"
            data-testid="text-subtitle"
          >
            Mô hình minh họa việc bàn giao quyền kiểm soát ví an toàn mà không tiết lộ private key.
          </motion.p>
        </header>

        <main className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card 
                className={`h-full backdrop-blur-md bg-card/80 border-card-border transition-all duration-300 ${
                  currentOwner.id === "a" ? "shadow-glow-turquoise ring-2 ring-primary/30" : ""
                }`}
                data-testid="card-owner-a"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 border border-primary/20">
                    <FiUser className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-center text-2xl" data-testid="text-owner-a-name">
                    {ownerA.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-md p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Địa chỉ ví</p>
                    <p className="font-mono text-sm" data-testid="text-owner-a-address">
                      {truncateAddress(ownerA.address)}
                    </p>
                  </div>
                  {currentOwner.id === "a" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 text-primary text-sm font-medium"
                    >
                      <FiCheck className="w-4 h-4" />
                      <span>Chủ sở hữu hiện tại</span>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card 
                className={`h-full backdrop-blur-md bg-card/80 border-card-border transition-all duration-300 ${
                  currentOwner.id === "b" ? "shadow-glow-turquoise ring-2 ring-primary/30" : ""
                }`}
                data-testid="card-owner-b"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-chart-2/10 border border-chart-2/20">
                    <FiKey className="w-8 h-8 text-chart-2" />
                  </div>
                  <CardTitle className="text-center text-2xl" data-testid="text-owner-b-name">
                    {ownerB.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-md p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Địa chỉ ví</p>
                    <p className="font-mono text-sm" data-testid="text-owner-b-address">
                      {truncateAddress(ownerB.address)}
                    </p>
                  </div>
                  {currentOwner.id === "b" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2 text-primary text-sm font-medium"
                    >
                      <FiCheck className="w-4 h-4" />
                      <span>Chủ sở hữu hiện tại</span>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentOwner.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-r from-primary/10 via-chart-2/10 to-primary/10 border border-primary/20 rounded-lg p-6 text-center"
                data-testid="box-status"
              >
                <p className="text-sm text-muted-foreground mb-2">Trạng thái Safe</p>
                <p className="text-2xl font-bold text-primary" data-testid="text-current-owner">
                  Chủ sở hữu hiện tại: {currentOwner.name}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Button
              onClick={handleConnect}
              disabled={isConnected}
              size="lg"
              className="flex-1 text-base font-semibold shadow-neon-turquoise hover:shadow-neon-turquoise-lg transition-all duration-300"
              data-testid="button-connect-wallet"
            >
              <SiEthereum className="w-5 h-5 mr-2" />
              {isConnected ? "Đã kết nối ví MetaMask" : "Kết nối ví MetaMask"}
            </Button>
            
            <Button
              onClick={handleTransfer}
              disabled={isTransferring}
              variant="secondary"
              size="lg"
              className="flex-1 text-base font-semibold bg-chart-2 hover:bg-chart-2/90 text-white shadow-neon-blue hover:shadow-neon-blue-lg transition-all duration-300"
              data-testid="button-transfer-control"
            >
              {isTransferring ? "Đang bàn giao..." : "Bàn giao quyền kiểm soát"}
            </Button>
          </motion.div>

          <AnimatePresence>
            {logs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
                data-testid="section-transaction-log"
              >
                <h3 className="text-lg font-semibold mb-3">Nhật ký giao dịch</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-lg border backdrop-blur-sm ${
                        log.success
                          ? "bg-chart-3/10 border-chart-3/30"
                          : "bg-chart-4/10 border-chart-4/30"
                      }`}
                      data-testid={`log-${log.id}`}
                    >
                      <div className="flex items-start gap-2">
                        {log.success ? (
                          <FiCheck className="w-4 h-4 text-chart-3 mt-0.5 flex-shrink-0" />
                        ) : (
                          <FiAlertCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{log.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {log.timestamp.toLocaleTimeString("vi-VN")}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="backdrop-blur-xl bg-card/40 border-card-border" data-testid="card-explanation">
              <CardHeader>
                <CardTitle className="text-xl">Cơ chế hoạt động</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Cơ chế mô phỏng dựa trên <span className="font-semibold text-foreground">multi-signature</span> của Gnosis Safe.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Không cần tiết lộ <span className="font-semibold text-foreground">seed phrase</span> hay <span className="font-semibold text-foreground">private key</span>.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    Đảm bảo <span className="font-semibold text-foreground">minh bạch</span> và <span className="font-semibold text-foreground">an toàn</span> khi chuyển quyền kiểm soát ví.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50" data-testid="footer">
          <p>Graduation Project – Safe Wallet Transfer Model</p>
        </footer>
      </div>
    </div>
  );
}
