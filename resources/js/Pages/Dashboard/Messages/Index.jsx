import DashboardLayout from "../../../Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import NotFoundSection from "../../../Components/NotFoundSection";
import Paginator from "../../../Components/Paginator";
import { useForm } from "@inertiajs/react";
import FlashMessage from "../../../Components/FlashMessage";
import { router } from "@inertiajs/react";

export default function Messages({ messages }) {
    const { delete: destroy } = useForm();

    function deleteMessage(e, message_id) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this message?")) {
            destroy(`/dashboard/messages/${message_id}`, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }

    return (
        <DashboardLayout title="Dashboard - Messages">
            <div className="crud-header space-between">
                <div>
                    <h1 className="crud-title">Messages</h1>
                    <p className="text-muted">Manage received messages.</p>
                </div>
            </div>

            <FlashMessage className="mt-1" />

            {messages.data.length === 0 && (
                <NotFoundSection
                    className="mt-1"
                    message="No Messages Found"
                    description="There are no messages in the system."
                />
            )}

            {messages.data.length > 0 && (
                <div className="crud-card-table mt-1">
                    <table className="crud-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Message Content</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {messages.data.map((message) => (
                                <tr key={message.id}>
                                    <td>
                                        <h4 className="crud-table-title">
                                            {message.name}
                                        </h4>
                                        <div className="crud-sub">
                                            {message.email}
                                        </div>
                                    </td>

                                    <td>{message.message}</td>

                                    <td className="text-right">
                                        <div className="crud-actions">
                                            <form
                                                action=""
                                                onSubmit={(e) =>
                                                    deleteMessage(
                                                        e,
                                                        message.message_id,
                                                    )
                                                }
                                            >
                                                <button
                                                    className="icon-btn btn-danger-outline"
                                                    title="Delete message"
                                                    aria-label="Delete message"
                                                >
                                                    <i className="fa-regular fa-trash-can" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Paginator
                paginator={messages}
                onNavigate={(url) => router.get(url)}
            />
        </DashboardLayout>
    );
}
