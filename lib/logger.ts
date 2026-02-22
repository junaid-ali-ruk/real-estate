type LogLevel = "info" | "warn" | "error";

interface LogDetails {
  [key: string]: unknown;
}

class Logger {
  private isProduction = process.env.NODE_ENV === "production";

  private log(level: LogLevel, message: string, details?: LogDetails) {
    if (this.isProduction) {
      // In production, we could send logs to a service like Axiom, Datadog, or Sentry
      // For now, we'll keep them formatted but still use console to avoid total loss
      // but in a real-world scenario, you'd integrate a proper logging service.
      const timestamp = new Date().toISOString();
      const logEntry = JSON.stringify({
        timestamp,
        level,
        message,
        ...details,
      });

      if (level === "error") {
        console.error(logEntry);
      } else if (level === "warn") {
        console.warn(logEntry);
      } else {
        console.info(logEntry);
      }
    } else {
      // In development, keep it readable
      if (level === "error") {
        console.error(`[ERROR] ${message}`, details || "");
      } else if (level === "warn") {
        console.warn(`[WARN] ${message}`, details || "");
      } else {
        console.log(`[INFO] ${message}`, details || "");
      }
    }
  }

  info(message: string, details?: LogDetails) {
    this.log("info", message, details);
  }

  warn(message: string, details?: LogDetails) {
    this.log("warn", message, details);
  }

  error(message: string, details?: LogDetails) {
    this.log("error", message, details);
  }
}

export const logger = new Logger();
