import { fireEvent, render, screen, within } from "@testing-library/react";
import ListComponent from "@/components/ListComponent";
import { MockData } from "../MockData";

describe("List", () => {
  it("should render correctly the list", () => {
    render(<ListComponent data={MockData} />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(100);

    MockData.forEach((mockItem: any, index: number) => {
      const item = within(listItems[index]);

      item.getByRole("heading", { name: mockItem.name });
      mockItem.year_established &&
        item.getByText(String(mockItem.year_established));
      mockItem.country && item.getByText(mockItem.country);
      mockItem.trade_volume_24h_btc &&
        item.getByText(String(mockItem.trade_volume_24h_btc));
      mockItem.trust_score && item.getByText(String(mockItem.trust_score));
    });
  });

  it("Should filter correctly", () => {
    render(<ListComponent data={MockData} />);

    const inputElement = screen.getByPlaceholderText(/filtre por nome/i);

    fireEvent.change(inputElement, { target: { value: "OKX" } });

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(1);
  });
});
