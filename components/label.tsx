import clsx from "clsx";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        },
      )}
    >
      <div className="flex w-full items-center justify-between gap-2 border border-gold/10 bg-warm-white/90 px-4 py-3 backdrop-blur-md">
        <h3 className="line-clamp-2 grow font-heading text-sm leading-tight text-foreground">
          {title}
        </h3>
        <Price
          className="flex-none font-heading text-sm font-medium text-gold"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden"
        />
      </div>
    </div>
  );
};

export default Label;
