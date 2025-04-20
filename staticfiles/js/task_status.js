document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, script running');
    document.querySelectorAll('.task-status').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log('Checkbox clicked:', this.checked);
            const taskId = this.getAttribute('data-task-id');
            const newStatus = this.checked ? 'COMPLETED' : 'TODO';
            console.log('Task ID:', taskId, 'New Status:', newStatus);
            
            // Find the status text element within the same <li>
            const statusElement = this.parentElement.querySelector('.status-text');
            
            fetch(`/task/${taskId}/status/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify({ status: newStatus })
            })
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Server response:', data);
                if (data.success) {
                    // Toggle strikethrough
                    this.parentElement.classList.toggle('completed', this.checked);
                    // Update status text
                    if (statusElement) {
                        statusElement.textContent = this.checked ? 'Completed' : 'To Do';
                    }
                } else {
                    console.error('Update failed:', data);
                }
            })
            .catch(error => console.error('Fetch error:', error));
        });
    });
});