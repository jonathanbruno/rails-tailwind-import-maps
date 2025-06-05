import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  initialize() {
    this.selectedIndex = 0;
    this.previousIndex = undefined;
  }

  connect() {
    document.addEventListener("keydown", this.handleKeydown.bind(this))
    this.addMouseEnterListeners()
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
      this.openSelectedRow();
    }
  }

  selectNextRow() {
    const rows = this.element.querySelectorAll("tr");
    if (rows.length === 0) return;

    this.previousIndex = this.selectedIndex;
    this.selectedIndex = (this.selectedIndex + 1) % rows.length;

    this.updateRowSelection(rows);
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
        row.classList.add("bg-gray-50");
      } else {
        row.classList.remove("bg-gray-50");
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
        console.log(`Mouse entered row ${index}`);
        this.selectedIndexValue = -1
        this.updateRowSelection(rows)
      })
    })
  }
}
