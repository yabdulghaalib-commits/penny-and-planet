interface ComparisonColumn {
  label: string;
  highlight?: boolean;
}

interface ComparisonRow {
  label: string;
  values: string[];
}

interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
}

/**
 * Usage in MDX:
 * <ComparisonTable
 *   columns={[{ label: "Snowball" }, { label: "Avalanche", highlight: true }]}
 *   rows={[{ label: "Payoff order", values: ["Smallest balance first", "Highest interest first"] }]}
 * />
 */
export function ComparisonTable({ columns, rows }: ComparisonTableProps) {
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-lg border border-sand-300">
      <table className="w-full min-w-[480px] border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="w-1/4 bg-sand-100 px-4 py-3" />
            {columns.map((column) => (
              <th
                key={column.label}
                className={
                  column.highlight
                    ? 'bg-forest-700 px-4 py-3 font-body font-semibold text-white'
                    : 'bg-sand-100 px-4 py-3 font-body font-semibold text-ink'
                }
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-t border-sand-300">
              <th scope="row" className="px-4 py-3 text-left font-medium text-ink-soft">
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td
                  key={columns[index]?.label ?? index}
                  className={columns[index]?.highlight ? 'bg-forest-50 px-4 py-3 text-ink' : 'px-4 py-3 text-ink-muted'}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
