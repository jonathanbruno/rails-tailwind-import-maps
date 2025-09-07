import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "frame", "input", "selectedRowId", "selectedRowLabel"]
  static values = { url: String, query: String }

  connect() {
    document.addEventListener("keydown", this.handleKeydown.bind(this))
    this.element.addEventListener("table_navigator:rowSelected", this.handleRowSelected.bind(this))
  }

  open() {
    this.query = ""
    this.inputTarget.value = ""
    this.modalTarget.classList.remove("hidden")
    this.frameTarget.src = this.urlValue

    setTimeout(() => {
      this.inputTarget?.focus()
    }, 200)
  }

  close() {
    this.modalTarget.classList.add("hidden")
  }

  search() {
    const query = this.queryValue.trim()
    const params = new URLSearchParams()
    if (query) {
      params.append("q[name_cont]", query)
    }
    params.append("format", "turbo_stream")
    this.frameTarget.src = `${this.urlValue}?${params.toString()}`
  }

  handleKeydown(event) {
    if (this.modalTarget.classList.contains("hidden")) return

    const { key } = event

    event.preventDefault()
    switch (key) {
      case "Escape":
        this.close()
        break
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
        // Prevent default scrolling behavior
        break
      case "Backspace":
        // Allow backspace to delete characters in the input
        if (this.queryValue.length > 0) {
          this.queryValue = this.queryValue.slice(0, -1)
          this.search()
        }
        break;
      default:
        if (key.length === 1) { // Check if it's a printable character
          this.queryValue += key
          this.search()
        }
        break
    }
  }

  queryValueChanged(value, _) {
    this.inputTarget.value = value
  }
  handleRowSelected(event) {
    console.log({event})
    this.close()
    this.selectedRowIdTarget.value = event.detail.row.dataset.id
    this.selectedRowLabelTarget.textContent = event.detail.row.dataset.label
    console.log("Selected row ID:", event.detail.row.dataset.id, event.detail.row.dataset.name)
  }

  clearSelection() {
    //this.selectedRowIdTarget.value = ""
    this.selectedRowLabelTarget.textContent = ""
  }
}
