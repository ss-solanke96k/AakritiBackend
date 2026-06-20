import { useState } from "react";
import { FiPackage, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const stages = ["Order Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];
const cancellableStatuses = ["Pending", "Processing"];

export default function OrderHistory() {
  const { orders, cancelOrder } = useShop();
  const [confirmOrder, setConfirmOrder] = useState(null);

  const handleConfirmCancel = () => {
    if (confirmOrder && cancelOrder(confirmOrder.id)) setConfirmOrder(null);
  };

  if (!orders.length) {
    return (
      <div className="glass-card rounded-[28px] p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pastelPink text-2xl text-ink"><FiPackage /></div>
        <p className="mt-5 text-2xl font-black">No orders yet.</p>
        <p className="mt-2 text-sm text-slate-600">Your handmade orders will appear here after checkout.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4">
        {orders.map((order) => {
          const canCancel = cancellableStatuses.includes(order.status);
          const activeIndex = stages.indexOf(order.status);

          return (
            <div key={order.id} className="glass-card rounded-[30px] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-black">{order.id}</span>
                <span className="font-bold">Payment: {order.payment}</span>
                <span className="font-bold">{order.deliveredAt ? `Delivered: ${order.deliveredAt}` : `Expected delivery: ${order.expectedDelivery}`}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${order.status === "Cancelled" ? "bg-rose-100 text-rose-700" : "bg-mint text-emerald-800"}`}>{order.status}</span>
              </div>

              {order.status === "Cancelled" ? (
                <p className="mt-4 rounded-2xl bg-white/70 p-4 text-sm font-bold text-slate-600">This order was cancelled and remains in your order history.</p>
              ) : (
                <div className="mt-5 grid gap-3 md:grid-cols-5">
                  {stages.map((stage, index) => (
                    <div key={stage} className={`rounded-2xl p-3 text-center text-xs font-black ${activeIndex >= 0 && index <= activeIndex ? "bg-mint text-ink" : "bg-white/70"}`}>{stage}</div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                {order.status === "Delivered" && <Link to={`/product/${order.productId}`} className="pill-button bg-pastelPink px-4 py-2 text-ink">Give Feedback</Link>}
                {canCancel && (
                  <button type="button" onClick={() => setConfirmOrder(order)} className="pill-button bg-white px-4 py-2 text-primary">
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {confirmOrder && (
        <div className="fixed inset-0 z-[10000] grid place-items-center bg-ink/50 p-4">
          <div className="glass-card w-full max-w-md rounded-[28px] bg-white p-6 shadow-lift">
            <button type="button" onClick={() => setConfirmOrder(null)} className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-surface-soft" aria-label="Close cancel confirmation">
              <FiX />
            </button>
            <h2 className="mt-2 text-2xl font-black">Cancel order?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Are you sure you want to cancel this order?</p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button type="button" onClick={() => setConfirmOrder(null)} className="pill-button bg-white text-primary">Keep Order</button>
              <button type="button" onClick={handleConfirmCancel} className="pill-button bg-ink text-white">Confirm Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
