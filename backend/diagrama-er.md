```mermaid
erDiagram

    %% ─── ENTIDADES ─────────────────────────────────────────────────────────

    USUARIOS {
        CHAR(36)    id           PK
        STRING      nombre
        STRING      email        UK
        STRING      password
        ENUM        rol
        STRING      refreshToken
        INTEGER     intentosFallidos
        DATE        bloqueadoHasta
        DATETIME    createdAt
        DATETIME    updatedAt
    }

    SERVICIOS {
        CHAR(36)    id             PK
        STRING      nombre
        TEXT        descripcion
        DECIMAL     precio
        ENUM        modalidad
        STRING      imagen_url
        BOOLEAN     activo
        INTEGER     duracionMinutos
        DATETIME    createdAt
        DATETIME    updatedAt
    }

    PRODUCTOS {
        CHAR(36)    id          PK
        STRING      nombre
        TEXT        descripcion
        DECIMAL     precio
        INTEGER     stock
        STRING      imagen_url
        BOOLEAN     activo
        DATETIME    createdAt
        DATETIME    updatedAt
    }

    HORARIOS_DISPONIBLES {
        CHAR(36)    id          PK
        DATEONLY    fecha
        TIME        horaInicio
        TIME        horaFin
        BOOLEAN     disponible
        DATETIME    createdAt
        DATETIME    updatedAt
    }

    CITAS {
        CHAR(36)    id          PK
        CHAR(36)    usuarioId   FK
        CHAR(36)    servicioId  FK
        CHAR(36)    horarioId   FK_UK
        DATEONLY    fecha
        TIME        horaInicio
        ENUM        modalidad
        ENUM        estado
        DATETIME    createdAt
        DATETIME    updatedAt
    }

    ORDENES {
        CHAR(36)    id              PK
        CHAR(36)    usuarioId       FK
        DECIMAL     total
        ENUM        estado
        STRING      mercadopagoId
        DATETIME    createdAt
        DATETIME    updatedAt
    }

    DETALLES_ORDEN {
        CHAR(36)    id              PK
        CHAR(36)    ordenId         FK
        CHAR(36)    productoId      FK
        CHAR(36)    servicioId      FK
        INTEGER     cantidad
        DECIMAL     precioUnitario
        DATETIME    createdAt
        DATETIME    updatedAt
    }

    ENVIOS {
        CHAR(36)    id              PK
        CHAR(36)    ordenId         FK_UK
        TEXT        direccion
        TEXT        telefono
        STRING      trackingNumber
        ENUM        estado
        DATETIME    createdAt
        DATETIME    updatedAt
    }

    CARRITOS {
        CHAR(36)    id          PK
        CHAR(36)    usuarioId   FK
        CHAR(36)    productoId  FK
        CHAR(36)    servicioId  FK
        INTEGER     cantidad
        DATETIME    createdAt
        DATETIME    updatedAt
    }

    FAVORITOS {
        CHAR(36)    id          PK
        CHAR(36)    usuarioId   FK
        CHAR(36)    productoId  FK
        CHAR(36)    servicioId  FK
        DATETIME    createdAt
        DATETIME    updatedAt
    }

    %% ─── RELACIONES ────────────────────────────────────────────────────────

    USUARIOS            ||--o{ CITAS              : "tiene"
    USUARIOS            ||--o{ ORDENES            : "realiza"
    USUARIOS            ||--o{ CARRITOS           : "tiene"
    USUARIOS            ||--o{ FAVORITOS          : "guarda"

    SERVICIOS           ||--o{ CITAS              : "es_de"
    SERVICIOS           ||--o{ DETALLES_ORDEN     : "incluido_en"
    SERVICIOS           ||--o{ CARRITOS           : "en"
    SERVICIOS           ||--o{ FAVORITOS          : "en"

    PRODUCTOS           ||--o{ DETALLES_ORDEN     : "incluido_en"
    PRODUCTOS           ||--o{ CARRITOS           : "en"
    PRODUCTOS           ||--o{ FAVORITOS          : "en"

    HORARIOS_DISPONIBLES ||--|| CITAS             : "reservado_por"

    ORDENES             ||--o{ DETALLES_ORDEN     : "contiene"
    ORDENES             ||--|| ENVIOS             : "tiene"
```
