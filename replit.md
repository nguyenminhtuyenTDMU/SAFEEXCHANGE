# Safe Wallet Transfer Model

## Tổng quan dự án

Dự án tốt nghiệp minh họa mô hình bàn giao quyền kiểm soát ví an toàn (Safe Wallet Transfer Model) mà không cần tiết lộ private key hoặc seed phrase. Ứng dụng mô phỏng cơ chế multi-signature của Gnosis Safe.

## Công nghệ sử dụng

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling system với custom neon glow effects
- **shadcn/ui** - Component library
- **Framer Motion** - Animations và transitions
- **react-icons** - Icon library (FiUser, FiKey, SiEthereum)
- **Wouter** - Lightweight routing

### Backend
- **Express.js** - Web server
- **Vite** - Build tool và dev server
- **In-memory storage** - Simulated data persistence

## Tính năng chính

### 1. Giao diện Dashboard
- **Header**: Tiêu đề gradient "Safe Wallet Transfer" với mô tả
- **Theme Toggle**: Chuyển đổi light/dark mode
- **Owner Cards**: Hai card hiển thị Owner A và Owner B với:
  - Icon đại diện (FiUser/FiKey)
  - Địa chỉ ví rút gọn (0x1234...5678)
  - Glassmorphism effects
  - Neon glow khi là chủ sở hữu hiện tại

### 2. Chức năng bàn giao
- **Status Box**: Hiển thị chủ sở hữu hiện tại với animation
- **Connect Wallet Button**: Kết nối ví MetaMask (mô phỏng)
- **Transfer Control Button**: Bàn giao quyền kiểm soát
- **Transaction Log**: Nhật ký giao dịch thời gian thực

### 3. Visual Effects
- Glassmorphism cards với backdrop blur
- Neon glow effects (turquoise và blue)
- Smooth animations với Framer Motion
- Gradient backgrounds
- Responsive design cho mọi thiết bị

### 4. Explanation Section
- Card mô tả cơ chế hoạt động
- Glassmorphism styling
- Bullet points về multi-signature và bảo mật

## Cấu trúc thư mục

```
client/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn components
│   │   └── ThemeProvider.tsx
│   ├── pages/
│   │   ├── SafeWalletTransfer.tsx  # Main page
│   │   └── not-found.tsx
│   ├── lib/
│   │   └── queryClient.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
shared/
└── schema.ts              # TypeScript types và schemas
server/
├── routes.ts
├── storage.ts
└── index.ts
```

## Logic mô phỏng

### State Management
- `currentOwner`: Lưu chủ sở hữu hiện tại (Owner A hoặc B)
- `isConnected`: Trạng thái kết nối ví
- `logs`: Mảng nhật ký giao dịch
- `isTransferring`: Trạng thái đang chuyển quyền

### Workflow
1. User click "Kết nối ví MetaMask" → Set `isConnected = true` → Add log
2. User click "Bàn giao quyền kiểm soát":
   - Kiểm tra `isConnected`
   - Nếu chưa kết nối → Hiển thị cảnh báo
   - Nếu đã kết nối → Đổi `currentOwner` → Animation → Add success log
3. Status box tự động cập nhật với animation fade/scale

### Data Models
```typescript
interface WalletOwner {
  id: string;
  name: string;
  address: string;
}

interface TransferLog {
  id: string;
  timestamp: Date;
  from: string;
  to: string;
  message: string;
  success: boolean;
}
```

## Design System

### Colors (Dark Mode)
- Background: `hsl(220 26% 14%)`
- Card: `hsl(220 26% 18%)`
- Primary (Turquoise): `hsl(180 80% 50%)`
- Chart-2 (Neon Blue): `hsl(210 100% 60%)`

### Colors (Light Mode)
- Background: `hsl(210 40% 98%)`
- Card: `hsl(0 0% 100%)`
- Primary: `hsl(180 70% 45%)`

### Effects
- **Glassmorphism**: `backdrop-blur-md bg-card/80`
- **Neon Glow Turquoise**: `shadow-glow-turquoise`
- **Neon Glow Blue**: `shadow-glow-blue`
- **Animations**: fade-in, scale-in (400ms ease-out)

## Chạy dự án

```bash
npm run dev
```

Server sẽ chạy trên port 5000 (hoặc port được cấu hình trong Replit).

## Tính năng tương lai (Phase 2)

1. Tích hợp Web3 thật với MetaMask
2. Kết nối Gnosis Safe smart contract trên testnet
3. Hiển thị balance và transaction history
4. Multi-signature threshold configuration
5. Export/share transfer receipts
6. Audit trail với blockchain explorer links

## Ghi chú kỹ thuật

- Không sử dụng blockchain thật, chỉ mô phỏng
- Không lưu trữ private keys
- UI/UX ưu tiên trải nghiệm người dùng
- Responsive và accessible
- Theme support (light/dark mode)
