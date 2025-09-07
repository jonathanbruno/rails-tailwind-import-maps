import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  initialize() {
    this.selectedIndex = -1;
    this.previousIndex = undefined;
  }

  connect() {
    document.addEventListener("keydown", this.handleKeydown.bind(this))
    this.addMouseEnterListeners()
    this.addMouseClickListeners()
  }

  disconnect() {
    document.removeEventListener("keydown", this.handleKeydown.bind(this))
  }

  handleKeydown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.selectNextRow();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.selectPreviousRow();
    } else if (event.key === "Enter") {
      event.preventDefault();
      this.triggerRowSelected();
    }
  }

  triggerRowSelected() {
    const rows = this.element.querySelectorAll("tr");
    if (this.selectedIndex < 0 || this.selectedIndex >= rows.length) {
      return null;
    }
    const selectedRow = rows[this.selectedIndex];
    this.element.dispatchEvent(new CustomEvent("table_navigator:rowSelected", {
      detail: { row: selectedRow },
      bubbles: true
    }));
  }

  selectNextRow() {
    const rows = this.element.querySelectorAll("tr");
    if (rows.length === 0) return;

    if (this.selectedIndex < rows.length - 1 ) {
      this.previousIndex = this.selectedIndex;
      this.selectedIndex = (this.selectedIndex + 1) //% rows.length;

      this.updateRowSelection(rows);
    }
  }

  selectPreviousRow() {
    const rows = this.element.querySelectorAll("tr");
    if (rows.length === 0) return;

    this.previousIndex = this.selectedIndex;
    this.selectedIndex = (this.selectedIndex - 1 + rows.length) % rows.length;

    this.updateRowSelection(rows);
  }

  updateRowSelection(rows) {
    rows.forEach((row, index) => {
      if (index === this.selectedIndex) {
        row.classList.add("table-row-selected");
      } else {
        row.classList.remove("table-row-selected");
      }
    });

    // Scroll the selected row into view
    const selectedRow = rows[this.selectedIndex];
    if (selectedRow) {
      selectedRow.scrollIntoView({ block: "nearest" });
    }
  }

  addMouseEnterListeners() {
    const rows = this.element.querySelectorAll("tr");
    rows.forEach((row, index) => {
      row.addEventListener("mouseenter", () => {
        //this.selectedIndex = index;
        //this.updateRowSelection(rows)
        //console.log("Mouse entered row:", index);
      })
    })
  }

  addMouseClickListeners() {
    const rows = this.element.querySelectorAll("tr");
    rows.forEach((row, index) => {
      row.addEventListener("click", () => {
        this.selectedIndex = index;
        this.updateRowSelection(rows)
        //this.triggerRowSelected();
        console.log("Row clicked:", index);
      })

      row.addEventListener("dblclick", () => {
        this.selectedIndex = index;
        this.updateRowSelection(rows)
        this.triggerRowSelected();
        console.log("Row Double clicked:", index);
      })
    })
  }
}
