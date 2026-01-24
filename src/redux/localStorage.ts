type CartState = {
  totalPrice: number;
  items: Array<{
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
  }>;
};

const CART_STORAGE_KEY = "react-pizza-cart";

const calcTotalPrice = (items: CartState["items"]) =>
  items.reduce((sum, obj) => obj.price * obj.count + sum, 0);

export const loadCartState = (): { cart: CartState } | undefined => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return undefined;
    return {
      cart: {
        items: parsed.items,
        totalPrice:
          typeof parsed.totalPrice === "number"
            ? parsed.totalPrice
            : calcTotalPrice(parsed.items),
      },
    };
  } catch {
    return undefined;
  }
};

export const saveCartState = (cartState: CartState) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  } catch {
    // ignore write errors (private mode, quota, etc.)
  }
};
