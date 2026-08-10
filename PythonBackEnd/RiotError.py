class RiotAPIException(Exception):
    def __init__(self, message, status_code = None):
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class RiotUnauthorized(RiotAPIException):
    def __init__(self, message, status_code = 401):
        self.status_code = status_code
        super().__init__(message)

class RiotNotFound(RiotAPIException):
    def __init__(self, message, status_code = 404):
        self.status_code = status_code
        super().__init__(message)
        
class RiotRateLimit(RiotAPIException):
    def __init__(self, message, status_code = 429):
        self.status_code = status_code
        super().__init__(message)
