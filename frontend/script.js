async function exportData() {  // без параметра format
    const text = document.getElementById('editable-text').value || currentText;
    
    if (!text || text === "Текст не распознан") {
        alert('Нет текста для экспорта');
        return;
    }

    try {
        const formData = new FormData();
        // УБРАЛИ: formData.append('format', format);
        formData.append('text', text);  // только text

        const response = await fetch('http://localhost:8000/export', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'document.docx';  // латиница — безопасно
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } else {
            const error = await response.json();
            alert('Ошибка при экспорте: ' + (error.error || 'Неизвестная ошибка'));
        }
    } catch (error) {
        alert('Ошибка сети: ' + error.message);
    }
}
