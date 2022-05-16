import { fireEvent, render, screen } from "@testing-library/react";
import Controls, { ControlElement } from "../components/Controls/Controls";

const test1: ControlElement = {
  element: <div data-testid="test">test1</div>,
  disabled: true,
};

const test2: ControlElement = {
  element: <div>test2</div>,
  disabled: false,
};

describe("<Controls />", () => {
  beforeEach(() => {
    render(<Controls disabled={false} elements={[test1, test2]} />);
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
      render(<Controls disabled={false} elements={[test1, test2]} />);
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

  it("should hide controls if clicked outside controls when it is showing", async () => {
    render(
      <div>
        <p>testOutsideClick</p>
        <Controls disabled={false} elements={[test1, test2]} />;
      </div>
    );
    fireEvent.click(screen.getByText("Settings"));
    expect(screen.getByTestId("CloseIcon")).toBeInTheDocument;
    fireEvent.click(screen.getByText("testOutsideClick"));
    expect(screen.getByText("Settings")).toBeInTheDocument;
  });
});

describe("<Controls /> disabled prop", () => {
  describe("disabled is true", () => {
    it("should set all elements as not disabled", () => {
      render(<Controls disabled={false} elements={[test1, test2]} />);
      const controls = screen.getByTestId("controls");
      const [test1El, test2El] = controls.children;
      expect(test1El.className).not.toContain("disabled");
      expect(test2El.className).not.toContain("disabled");
    });
  });

  describe("disabled is false", () => {
    it("should only set elements with disabled=true tp disabled", () => {
      render(<Controls disabled={true} elements={[test1, test2]} />);
      const controls = screen.getByTestId("controls");
      expect(controls).toBeInTheDocument;
      expect(controls.childElementCount).toBe(2);
      const [test1El, test2El] = controls.children;
      expect(test1El.className).toContain("disabled");
      expect(test2El.className).not.toContain("disabled");
    });
  });
});
