import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "frame", "input"]
  static values = { url: String }

  connect() {
    document.addEventListener("keydown", this.handleKeydown.bind(this))
  }

  open() {
    this.modalTarget.classList.remove("hidden")

    if (!this.frameTarget.src) {
      this.frameTarget.src = this.urlValue
    }

    setTimeout(() => {
      this.inputTarget?.focus()
    }, 200)
  }

  close() {
    this.modalTarget.classList.add("hidden")
  }

  search() {
    const query = this.inputTarget.value.trim()
    const params = new URLSearchParams()
    if (query) {
      params.append("q[name_cont]", query)
    }
    params.append("format", "turbo_stream")
    this.frameTarget.src = `${this.urlValue}?${params.toString()}`
  }

  handleKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault()
      this.close()
    }
  }
}
