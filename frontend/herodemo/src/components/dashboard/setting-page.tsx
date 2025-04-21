"use client"
import { motion } from "framer-motion"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "../../context/theme-context"
import { useLanguage } from "../../context/language-context"

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()
    const { language, setLanguage, t } = useLanguage()

    return (
        <div className="space-y-6">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-gray-800 dark:text-white"
            >
                {t("settings")}
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{t("theme")}</h3>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => setTheme("light")}
                            className={`flex items-center justify-center p-4 rounded-lg border ${
                                theme === "light"
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-700"
                            }`}
                        >
                            <div className="flex flex-col items-center">
                                <Sun className="h-8 w-8 mb-2 text-yellow-500" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{t("lightMode")}</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setTheme("dark")}
                            className={`flex items-center justify-center p-4 rounded-lg border ${
                                theme === "dark"
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-700"
                            }`}
                        >
                            <div className="flex flex-col items-center">
                                <Moon className="h-8 w-8 mb-2 text-indigo-500" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{t("darkMode")}</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setTheme("system")}
                            className={`flex items-center justify-center p-4 rounded-lg border ${
                                theme === "system"
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-700"
                            }`}
                        >
                            <div className="flex flex-col items-center">
                                <Monitor className="h-8 w-8 mb-2 text-gray-500" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{t("systemTheme")}</span>
                            </div>
                        </button>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{t("language")}</h3>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => setLanguage("en")}
                            className={`flex items-center justify-center p-4 rounded-lg border ${
                                language === "en"
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-700"
                            }`}
                        >
                            <div className="flex flex-col items-center">
                                <div className="h-8 w-8 mb-2 rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-gradient-to-r from-blue-500 via-white to-red-500"></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{t("english")}</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setLanguage("uz")}
                            className={`flex items-center justify-center p-4 rounded-lg border ${
                                language === "uz"
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-700"
                            }`}
                        >
                            <div className="flex flex-col items-center">
                                <div className="h-8 w-8 mb-2 rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-gradient-to-r from-blue-500 via-white to-green-500"></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{t("uzbek")}</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setLanguage("ru")}
                            className={`flex items-center justify-center p-4 rounded-lg border ${
                                language === "ru"
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                    : "border-gray-200 dark:border-gray-700"
                            }`}
                        >
                            <div className="flex flex-col items-center">
                                <div className="h-8 w-8 mb-2 rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-gradient-to-b from-white via-blue-500 to-red-500"></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">{t("russian")}</span>
                            </div>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
