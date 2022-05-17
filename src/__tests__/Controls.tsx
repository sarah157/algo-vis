import { fireEvent, render, screen } from "@testing-library/react";
import Controls, { ControlElement } from "../components/Controls/Controls";

const enabledEl: ControlElement = {
  element: <div data-testid="test">test1</div>,
  disableable: true,
};

const disabledEl: ControlElement = {
  element: <div>test2</div>,
  disableable: false,
};

describe("<Controls />", () => {
  beforeEach(() => {
    render(<Controls disabled={false} elements={[enabledEl, disabledEl]} />);
  });

  it("should render all elements", () => {
    const controls = screen.getByTestId("controls");
    expect(controls).toBeInTheDocument;
    expect(controls.childElementCount).toBe(2);
  });
});

describe("<Controls /> on smaller than medium devices", () => {
  const resizeToLessThanMed = () => {
    global.innerWidth = 767;
    global.dispatchEvent(new Event("resize"));
  };
  describe("toggle button", () => {
    let toggleButton: HTMLButtonElement;

    beforeEach(async () => {
      resizeToLessThanMed();
      render(<Controls disabled={false} elements={[enabledEl, disabledEl]} />);
      toggleButton = await screen.findByTestId("controls-toggle");
    });

    it("should contain toggle button", async () => {
      expect(toggleButton).toBeInTheDocument;
      expect(toggleButton.textContent).toBe("Settings");
    });

    it("should show/hide controls if toggle button is clicked", async () => {
      fireEvent.click(toggleButton);
      expect(screen.getByTestId("CloseIcon")).toBeInTheDocument;
      fireEvent.click(toggleButton);
      expect(toggleButton.textContent).toBe("Settings");
    });
  });

  it("should close if clicked outside Controls compoenent when showing", async () => {
    render(
      <div>
        <p>testOutsideClick</p>
        <Controls disabled={false} elements={[enabledEl, disabledEl]} />;
      </div>
    );
    fireEvent.click(screen.getByText("Settings")); // open controls panel
    expect(screen.getByTestId("CloseIcon")).toBeInTheDocument; // controls open
    fireEvent.click(screen.getByText("testOutsideClick")); // outside click
    expect(screen.getByText("Settings")).toBeInTheDocument; // controls clsoed
  });
});

describe("<Controls /> disabled prop", () => {
  describe("disabled is true", () => {
    it("should set all elements as not disabled", () => {
      render(<Controls disabled={false} elements={[enabledEl, disabledEl]} />);
      const controls = screen.getByTestId("controls");
      const [enabledElement, disabledElement] = controls.children;
      expect(enabledElement.className).not.toContain("disabled");
      expect(disabledElement.className).not.toContain("disabled");
    });
  });

  describe("disabled is false", () => {
    it("should only set elements with disabled=true tp disabled", () => {
      render(<Controls disabled={true} elements={[enabledEl, disabledEl]} />);
      const controls = screen.getByTestId("controls");
      expect(controls).toBeInTheDocument;
      expect(controls.childElementCount).toBe(2);
      const [enabledElement, disabledElement] = controls.children;
      expect(enabledElement.className).toContain("disabled");
      expect(disabledElement.className).not.toContain("disabled");
    });
  });
});
