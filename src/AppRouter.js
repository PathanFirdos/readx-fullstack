import { Routes, Route } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import OrdersPage from "./OrdersPage";
import WishlistPage from "./WishlistPage";
import AddressPage from "./AddressPage";
import PasswordPage from "./PasswordPage";
import PersonalSettingsPage from "./PersonalSettingsPage";
import PDFViewer from "./PDFViewer"; // ✅ Add this

function AppRouter() {
  return (
    <Routes>
      {/* Profile routes */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/orders" element={<OrdersPage />} />
      <Route path="/profile/wishlist" element={<WishlistPage />} />
      <Route path="/profile/address" element={<AddressPage />} />
      <Route path="/profile/password" element={<PasswordPage />} />
      <Route path="/profile/settings" element={<PersonalSettingsPage />} />

      {/* ✅ PDF view route */}
      <Route path="/view-pdf" element={<PDFViewer />} />
    </Routes>
  );
}

export default AppRouter;

