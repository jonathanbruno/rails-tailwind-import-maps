import { Application, defaultSchema } from "@hotwired/stimulus"

const customSchema = {
  ...defaultSchema,
  keyMappings: {
    ...defaultSchema.keyMappings,
    backspace: "Backspace", // adicionando suporte ao backspace
    delete: "Delete",       // exemplo extra
  },
}

const application = Application.start(document.documentElement, customSchema)

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
