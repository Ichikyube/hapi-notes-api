module.exports = class NoteHandler {
  constructor(service) {
    this._service = service;
  }

  getNotesHandler() {
    const notes = this._service.getNotes();
    return {
      status: 'success',
      data: {
        notes
      },
    }
  }

  postNoteHandler(request, h) {
    try {
      const {
        title = 'untitled', body, tags
      } = request.payload;

      const noteId = this._service.addNote({
        title,
        body,
        tags
      });
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId
        },
      });
      response.code(201);
      return response;
    } catch (err) {
      const response = h.response({
        status: 'fail',
        message: err.message,
      });
      response.code(400);
      return response;
    }
  }

  getNoteByIdHandler(request, h) {
    try {
      const {
        id
      } = request.params;
      const note = this._service.getNoteById(id);
      return {
        status: 'success',
        data: {
          note,
        },
      };
    } catch (err) {
      const response = h.response({
        status: 'fail',
        message: err.message,
      });
      response.code(404);
      return response;
    }
  }

  putNoteByIdHandler(request, h) {
    try {
      const {
        id
      } = request.params;
      this._service.editNoteById(id, request.payload);
      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (err) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
  }

  deleteNoteByIdHandler(request, h) {
    try {
      const {
        id
      } = request.params;
      this._service.deleteNoteById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (err) {
      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }

  }
}