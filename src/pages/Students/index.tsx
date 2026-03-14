import CategoryBar from "../../components/page/CategoryBar";
import { Outlet, useMatch } from "react-router";

export function StudentsPage() {
  const match = useMatch("/:any/:lastPart/*");

  const activeSection = match?.params?.lastPart;

  return (
    <section className="flex h-full flex-col gap-y-5">
      {activeSection !== "profile" && (
        <CategoryBar
          categories={[
            { url: "main", label: "Основное" },
            { url: "grades", label: "Оценки" },
            { url: "payments", label: "Оплаты" },
          ]}
          activeSection={activeSection}
        />
      )}

      <Outlet />
    </section>
  );
}
